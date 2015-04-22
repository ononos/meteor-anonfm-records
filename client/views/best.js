Template.topBest.helpers({
  pages: function() {
    return Math.clamp(Math.ceil(Counts.get('best') / CFG.MaxRecs) -1, 0, CFG.MaxPages);
  }
});
