Template.myLiked.helpers({
  pages: function() {  return Math.ceil(getMyLikedRecords().length / CFG.MaxRecs); },

  likesPerPage: CFG.MaxRecs
});
