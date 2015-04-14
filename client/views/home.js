Template.records.events({
  'click [data-action="setDateNow"]': function() {
    Session.set("filter-date", new Date());
  }
});

/* record row */
Template.fileRow.helpers({
  created: function() {
    if (typeof this.t !== 'undefined') {
      return moment(this.t).format("YYYY-MM-DD hh:mm");
    } else
      return '';
  },

  scheduledClass: function() {
    var prevSchedule = Records.findOne({t: {$lte: this.t}, isSch: true});
    return (prevSchedule &&
            // we found scheduled that was before this record (and btw, t is -15 minutes),
            // now check is record started before this schedule ended (and +15 minutes, so +30)
            prevSchedule.t.getTime() + (30 * 60 + prevSchedule.duration) * 1000 >
            this.t.getTime()) ? "scheduled" : "";
  },

  playingClass: function() {
    return this._id === currentPlaingFileId.get() ? 'plaing' : '';
  },

  dateClass: function() {
    return (this.t.getTime() === Session.get('filter-date').getTime()) ? 'current-date' : '';
  },

  durationHHMM: function() {
    var duration = this.duration;
    if (_.isUndefined(duration))
      return "??:??";

    var h = parseInt(duration / 3600),
        m = parseInt((duration - h * 3600) / 60);
    return  ((h<10) ? '0' + h : h) + ':' + ((m<10) ? '0' + m : m);
  }
});

Template.fileRow.rendered = function () {
  this.$('[data-action="setDate"]')
    .tooltip({
      placement: "right",
      title: moment(this.data.t).fromNow()
    });
};

Template.fileRow.events({
  'click [data-action="setDate"]': function(e, t) {
    Session.set("filter-date", this.t);
  }
});

/*

 Source.

 */

var uppod,
    currentUrlPlaing = new ReactiveVar(""),
    isPlaying = new ReactiveVar(false),     // true on events
    currentPlaingFileId = new ReactiveVar("");

PlayUrl = function(recordId, url) {
  currentUrlPlaing.set(url);
  currentPlaingFileId.set(recordId);

  if (uppod)
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

Template.fileSource.helpers({
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

Template.fileSource.events({
  'click [data-action="play"]': function(e, t) {
    var record = Template.parentData(1);
    PlayUrl(record._id, urlOfSource.call(this));
  }
});
