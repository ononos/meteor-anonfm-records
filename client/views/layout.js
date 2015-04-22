Template.appLayout.helpers({
  likes: function() {
    return getMyLikedRecords().length;
  }
});

Template.appLayout.onRendered(function() {
  this.$('[data-toggle="tooltip"]').tooltip({placement: "bottom"});
});
