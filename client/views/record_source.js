/*

 Source of record

      {{#with currentRecord}}
        {{>recordSources}}
      {{/with}}

 currentRecord: function() {Records.findOne({})}
 */

var uppod,
    currentUrlPlaing = new ReactiveVar(""),
    isPlaying = new ReactiveVar(false),     // true on events

PlayUrl = function(recordId, sourceId, url) {
  currentUrlPlaing.set(url);
  Session.set('current-playing-id', recordId);

  if (!uppod)
    uppod = null;

  uppod = new Uppod({
    m: "audio",
    uid: "player",              // id defined in ./layout.html
    file: url
  });

  // make sure uppod updated
  _.defer(function() {
    var el = document.getElementById('player');
    el.addEventListener("play", function() {
      isPlaying.set(true);
    });
    el.addEventListener("pause", function() {
      isPlaying.set(false);
    });
    el.addEventListener("stop", function() {
      isPlaying.set(false);
    });
    el.addEventListener("end", function(e) {
      var nextId = Session.get('next-record-id');
      if (nextId) {
        var nextRecord = Records.findOne(nextId);
        // Special case - preview
        // We want play next preview file not regular file
        if (sourceId === 'preview') {
          if (_.isUndefined(PREVIEW_URL) || !nextRecord.preview)
            return;
          var previewUrl = PREVIEW_URL + nextRecord.preview;
          PlayUrl(nextRecord._id, 'preview', previewUrl);
        } else {
          // find in next record same source and play if exists, otherwise play firt source
          if (nextRecord.sources) {
            var source = _.find(nextRecord.sources, function(it) {
              return it.id._str === sourceId._str;
            });
            source = source || nextRecord.sources[0];
            var url = urlOfSource(source, nextRecord.fname);
            PlayUrl(nextRecord._id, source.id, url);
          }

        }
      }
      });
  }, 1000);

  uppod.Play();
  isPlaying.set(true);
};

function urlOfSource (recordSource, filename) {
  var url = recordSource.url;         // maybe record's source have "url"?
  // if not, get it from source's "url" + filename
  // Source url must end "/"
  if (!url) {
    url = Sources.findOne(recordSource.id).url + filename;
  }
  return url;
}

function pausePlayer() {
  if (uppod)
    uppod.Pause();
}

Template.recordSources.helpers({
  plaingPreview: function() {
    if (!_.isUndefined(PREVIEW_URL)) {
      var data = Template.currentData(),
          previewFileUrl = PREVIEW_URL + data.preview;
      return previewFileUrl === currentUrlPlaing.get() && isPlaying.get();
    } else
      return false;
  }
});

Template.recordSources.events({
  'click [data-action="playPreview"]': function(e, t) {
    if (!_.isUndefined(PREVIEW_URL)) {
      var previewFileUrl = PREVIEW_URL + this.preview,
          curUrl = currentUrlPlaing.get();
      if (uppod && curUrl === previewFileUrl) {
        uppod.Play();
        } else {
          PlayUrl(this._id, 'preview', previewFileUrl);
        }
    }
  },
  'click [data-action="pausePreview"]': pausePlayer
});

Template.recordSourceItem.helpers({
  fileUrl: function() {
    var filename = Template.parentData(1).fname;
    return urlOfSource(this, filename);
  },

  // Source title
  title: function() {
    var source = Sources.findOne(this.id);
    return (source && source.title) ? source.title : "Unknown";
  },

  playing: function() {
    var filename = Template.parentData(1).fname;
    return urlOfSource(this, filename) === currentUrlPlaing.get() && isPlaying.get();
  }
});

Template.recordSourceItem.events({
  'click [data-action="play"]': function(e, t) {
    // .this - source of record
    var record = Template.parentData(1),
        curUrl = currentUrlPlaing.get();

    var filename = Template.parentData(1).fname,
        url = urlOfSource(this, filename);
    
    if (uppod && curUrl === url) {
      uppod.Play();
    } else {
      PlayUrl(record._id, this.id, url);
    }
  },

  'click [data-action="pause"]': pausePlayer
});
