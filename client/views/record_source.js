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

PlayUrl = function(recordId, url) {
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
  uppod.Play();
  isPlaying.set(true);
};

function urlOfSource () {
  var url = this.url;         // maybe record's source have "url"?
  // if not, get it from source's "url" + filename
  // Source url must end "/"
  if (!url) {
    url = Sources.findOne(this.id).url + Template.parentData(1).fname;
  }
  return url;
}

Template.recordSourceItem.helpers({
  fileUrl: urlOfSource,

  // Source title
  title: function() {
    var source = Sources.findOne(this.id);
    return (source && source.title) ? source.title : "Unknown";
  },

  playing: function() {
    return urlOfSource.call(this) === currentUrlPlaing.get() && isPlaying.get();
  }
});

Template.recordSourceItem.events({
  'click [data-action="play"]': function(e, t) {
    var record = Template.parentData(1);
    PlayUrl(record._id, urlOfSource.call(this));
  }
});
