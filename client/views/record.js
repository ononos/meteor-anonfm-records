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
    return (this.schOk || this.schOkAdm);
  },

  // return true if prev record is >= 4 days
  isLargeDistance: function() {
    var prev = Records.findOne({t: {$lt: this.t}}, {sort: {t: -1}});
    return (prev &&
            prev.t.getTime() + 4 * 86400000 <
            this.t.getTime());
  },

  playingIt: function() {
    var curPlayId = Session.get('current-playing-id');
    return curPlayId && this._id._str === curPlayId._str;
  },

  nextIt: function() {
    var nextPlayId = Session.get('next-record-id');
    return nextPlayId && this._id._str === nextPlayId._str;
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
    Session.set("filter-ts-direction",  countAfter < countBefore -1);
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
