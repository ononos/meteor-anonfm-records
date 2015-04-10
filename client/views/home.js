Template.fileRow.helpers({
  created: function() {
    if (typeof this.t !== 'undefined') {
      return moment(this.t).format("YYYY-MM-DD hh:mm");
    } else
      return '';
  },
  fromNow: function() {
    if (typeof this.t !== 'undefined') {
      return moment(this.t).fromNow();
    } else {
      return "Неизвестно";
    }
  },
  scheduledClass: function() {
    var prevSchedule = Records.findOne({t: {$lte: this.t}, isSch: true});
    return (prevSchedule &&
            prevSchedule.t.getTime() + prevSchedule.duration * 1000 >
            this.t.getTime()) ? "scheduled" : "";
  }
});
