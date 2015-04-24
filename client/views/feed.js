Template.latestFeed.helpers({
  firstDate: function() {
    var c = Comments.findOne({}, {sort: {t: 1}});
    if (c)
      return moment(c.t).format(feedDateFormat);
    else 
      return false;
  },
  lastDate: function() {
    var c = Comments.findOne({}, {sort: {t: -1}});
    if (c)
      return moment(c.t).format(feedDateFormat);
    else 
      return false;
  },

});
