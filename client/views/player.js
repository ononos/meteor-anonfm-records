// next track is same dj or not
var vNextDjOnly = new ReactiveVar (false);

// Subscribe current playing record
Tracker.autorun(function () {
  var currentPlaying = Session.get('current-playing-id');
  Meteor.subscribe("current-file", currentPlaying);
});

// Subscribe next playing file
Tracker.autorun(function () {
  var currentPlaying = Session.get('current-playing-id');
  Meteor.subscribe("next-file", currentPlaying, vNextDjOnly.get());
});

/*
 player template
*/

Template.player.helpers({
  currentRecord: function() {
    return Records.findOne(Session.get('current-playing-id'));
  },
});

/*
 player info bar
*/
Template.playerInfoBar.helpers({
  nextRecord: function() {
    var cur = this.currentRecord;
    if (cur) {
      // next record quert
      var query = {
        t: {$gt: cur.t},
        isSch: {$ne: true}
      };
      // need select only same dj?
      if (vNextDjOnly.get())
        query.dj = cur.dj;

      var next = Records.findOne(query, {sort: {t: 1}});

      // save next record id, we may highlight this
      if (next)
        Session.set('next-record-id', next._id);
      else
        Session.set('next-record-id'.undefined);

      return next;
    }
    else
      return undefined;
  },

});

Template.playerInfoBar.events({
  'click [data-action="toggle-dj"]': function(e, t) {
    // toggle next play current djy
    vNextDjOnly.set( !vNextDjOnly.get());
  }
});

/*
 this or any dj next will be played 
*/
Template.btnThisDj.rendered = function() {
  this.$('[data-action="toggle-dj"]').tooltip();
};

Template.btnThisDj.helpers({
  nextDjOnly: function() { return vNextDjOnly.get(); },
});
