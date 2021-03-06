Template.records.events({
  'click [data-action="setDateNow"]': function() {
    Session.set("filter-date", +new Date());
    Session.set("filter-ts-direction", false);
  }
});

/*

 Little perfomance trick, block distance computation (isLargeDistance) untill DOM rendered

 Another solution  - find  way how to  stop recompute  when subscribed
 Records incommming when route changed. Lot of find.sort recomputes.

  When created  or destroyed  records template, set  it to  false, and
  prevent isLargeDistance compute

 */
var recomputeDistance = new ReactiveVar();

/*

 Base template for showing record list

 {{> records records=records showDistance=true}}

*/
Template.records.created = function() {
  recomputeDistance.set(false);
};
Template.records.rendered = function() {
  _.delay(function() {
    recomputeDistance.set(true);
  }, 400);
};
Template.records.onDestroyed = function() {
  recomputeDistance.set(false);
};

/* record row */
Template.fileRow.helpers({
  created: function() {
    return this.schTime || this.t;
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
    if (!Template.parentData(1).showDistance)
      return false;
    // we recompute defered, after rendered DOM
    if (!recomputeDistance.get())
      return false;
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

/*
 * Social
 */
Template.social.helpers({
  likedByMe: function() {
    return _.contains(getMyLikedRecords(), this.ctx.fname);
  }
});

Template.social.events({
  'click [data-action="toggle-like"]':
  _.debounce(function()
             {
               var file = this.ctx.fname,
                   liked = _.contains(getMyLikedRecords(), this.ctx.fname),
                   msg = liked ? 'Лайк снят с ' + file : 'Лайк установлен у ' + file;
               Messages.success(msg);
               Meteor.call('toggle-like', this.ctx.fname, LOCAL_ID, Messages.error);
             }, 1000, true),
  
});
