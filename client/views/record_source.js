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
  });
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

  'click [data-action="pause"]': function(e, t) {
      if (uppod)
        uppod.Pause();    
  }
});
