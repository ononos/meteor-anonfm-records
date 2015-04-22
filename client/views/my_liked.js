Template.myLiked.helpers({
  pages: function() { return Math.max(0, Math.ceil(getMyLikedRecords().length / CFG.MaxRecs) -1); },

  haveRecords: function() { return this.records.count(); }
});
