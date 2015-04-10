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
            prevSchedule.t.getTime() + prevSchedule.duration * 1000 >
            this.t.getTime()) ? "scheduled" : "";
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
Template.fileSource.helpers({
  fileUrl: function() {
    var url = this.url;         // maybe record's source have "url"?
    // if not, get it from source's "url" + filename
    // Source url must end "/"
    if (!url) {
      url = Sources.findOne(this.id).url + Template.parentData(1).fname;
    }
    return url;
  },

  // Source title
  title: function() {
    var source = Sources.findOne(this.id);
    console.log(this.id, source);
    return (source && source.title) ? source.title : "Unknown";
  }
});
