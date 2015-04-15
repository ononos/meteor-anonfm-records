Template.records.events({
  'click [data-action="setDateNow"]': function() {
    Session.set("filter-date", new Date());
    Session.set("filter-ts-direction", false);
  }
});

/* record row */
Template.fileRow.helpers({
  created: function() {
    if (!_.isUndefined(this.schTime))
      return moment(this.schTime).format("YYYY-MM-DD HH:mm");
    else if (!_.isUndefined(this.t))
      return moment(this.t).format("YYYY-MM-DD HH:mm");
    else
      return '';
  },

  isScheduled: function() {
    if (this.isSch)
      return false;
    var prevSchedule = Records.findOne({t: {$lt: this.t}, isSch: true}, {reactive: false, sort: {t: -1}});
    return (prevSchedule &&
            // we found scheduled that was before this record (and btw, t is -15 minutes),
            // now check is record started before this schedule ended (and +15 minutes, so +30)
            prevSchedule.t.getTime() + (30 * 60 + prevSchedule.duration) * 1000 >
            this.t.getTime());
  },

  // return true if prev record is >= 4 days
  isLargeDistance: function() {
    var prev = Records.findOne({t: {$lt: this.t}}, {sort: {t: -1}});
    return (prev &&
            prev.t.getTime() + 4 * 86400000 <
            this.t.getTime());
  },

  playingIt: function() {
    var curPlayId = Session.get('current-playing');
    return curPlayId && this._id._str === curPlayId._str;
  },

  filter_eq_date: function() {
    var date = Session.get('filter-date');
    if (_.isUndefined(date))
      return false;
    return this.t.getTime() === date.getTime();
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
    var countBefore = Records.find({t: {$lte: this.t}}).count(),
        countAfter = Records.find({t: {$gt: this.t}}).count(),
        total = countBefore + countAfter;

    Session.set("filter-date", this.t);
    Session.set("filter-ts-direction", 
                total < 50 || // 50 - is max items that we may get by subscribtion
                /*                 so if we have less, then we need scroll only to newer items */
                ( countAfter <  // clicked it 20% top, scroll to newer, otherwise - older items
                  countBefore - 0.8 * (countBefore + countAfter)));
  }
});

Template.largeDistance.helpers({

  // return text duration between this and prev record
  prevRecDistance: function() {
    var prev = Records.findOne({t: {$lt: this.t}}, {sort: {t: -1}});
    console.log("prevRecDistance");
    return moment.duration(moment(this.t).diff(prev.t)).humanize();
  },
});

/*

 Source.

 */

var uppod,
    currentUrlPlaing = new ReactiveVar(""),
    isPlaying = new ReactiveVar(false),     // true on events

PlayUrl = function(recordId, url) {
  currentUrlPlaing.set(url);
  Session.set('current-playing', recordId);

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
