Template.records.events({
  'click [data-action="setDateNow"]': function() {
    Session.set("filter-date", +new Date());
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

  dateFromNow: function() { return moment(this.t).fromNow(); },

  fileSzHumanized: function() {
    var size = this.size,
        textAddon = "K";
    if (_.isUndefined (size) || _.isNull (size))
      return '?';
    if (size < 1048576)
      size = size / 1024;
    else {
      size = size / 1048576;
      textAddon = "M";
    }
    return '' + (Math.round(size * 10) / 10) + textAddon;
  },
  smallFile: function() { return this.size && this.size < 1048576; },    // < 1M
  largeFile: function() { return this.size && this.size > 103809024; }, // >99M
  fileSize:  function() { return (this.size || 0).toLocaleString(); },

  fileExt: function() {
    return this.fname.split('.').pop(); // nice: http://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
  },

  isScheduled: function() {
    return (this.schOk || this.schOkAdm);
  },

  // return true if prev record is >= 4 days
  isLargeDistance: function() {
    var prev = Records.findOne({t: {$lt: this.t}}, {sort: {t: -1}});
    return (prev &&
            +prev.t + 4 * 86400000 <
            +this.t);
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
    return +this.t === date;
  },

  durationHHMM: function() {
    var duration = this.duration;
    if (_.isUndefined(duration))
      return "??:??";

    var h = parseInt(duration / 3600),
        m = parseInt((duration - h * 3600) / 60);
    return  ((h<10) ? '0' + h : h) + ':' + ((m<10) ? '0' + m : m);
  },

});

Template.fileRow.rendered = function () {
  this.$('[data-toggle="tooltip"]').tooltip();
};

Template.fileRow.events({
  'click [data-action="setDate"]': function(e, t) {
    var countBefore = Records.find({t: {$lte: this.t}}).count(),
        countAfter = Records.find({t: {$gt: this.t}}).count(),
        total = countBefore + countAfter;

    Session.set("filter-date", +this.t); // t - Date, convert to int
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


// actions
// this.id - id of file record
Template.fileRowActions.events({
  'click [data-action="remove"]': function(e, t) {
    Records.update(this.ctx._id, {$set: {rm: true}});
  },

  'click [data-action="restore"]': function(e, t) {
    Records.update(this.ctx._id, {$unset: {rm: ""}});
  },

  'click [data-action="schOk"]': function(e, t) {
    Records.update(this.ctx._id, {$set: {schOkAdm: true}});
  },

  'click [data-action="schNotOk"]': function(e, t) {
    Records.update(this.ctx._id, {$unset: {schOkAdm: ""}});
  },
});
