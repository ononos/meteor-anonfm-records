Template.topCommented.events({
  pages: function() {
    return Math.clamp(Math.ceil(Counts.get('commentedNum') / CFG.MaxRecs) -1, 0, CFG.MaxPages);
  }
});
