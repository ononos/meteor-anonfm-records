// publication

Meteor.publish("files", function(timefrom, dj) {
  var query = {};

  if (dj && dj !== "!all")
    query.dj = dj;

  if (timefrom)
    query.t = {$lte: timefrom};

  if (!isAdmin(this.userId))
    query.rm = {$ne: true};

  console.log(query);
  return Records.find(query, {sort: {t: -1 }, limit: 50});
});

Meteor.publish("sources", function() {
  var query = {},
      options = {};

  if (!isAdmin(this.userId)) {
    query.rm = {$ne: true};
    options.fields = {url: 1, title: 1};
  }

  return Sources.find(query, options);
});

Meteor.methods({
  djnames : function () {
    // TODO: cache this
    return Records.aggregate([{ $group : {_id : "$dj", count: { $sum: 1 } } }]);
  }
});
