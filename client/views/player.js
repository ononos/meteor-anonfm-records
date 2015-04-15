
Template.player.helpers({
  currentId: function() {
  }
});

Template.playerInfoBar.helpers({
  isReady: function() {
    return !_.isUndefined(this.record);
  }
 
});
