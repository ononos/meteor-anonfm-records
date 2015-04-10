// publication

Meteor.publish("files", function(timefrom, dj) {
  var query = {};

  if (timefrom)
    query.t = {$lte: timefrom};
  if (dj && dj !== "!all")
    query.dj = dj;

  if (!isAdmin(this.userId))
    query.rm = {$ne: true};

  console.log(query);
  return Records.find(query, {sort: {t: -1 }, limit: 50});
});

Meteor.publish("sources", function() {
  var query = {};

  if (!isAdmin(this.userId))
    query.rm = {$ne: true};

  return Sources.find(query);
});

Meteor.methods({
  djnames : function () {
    // TODO: cache this
    return Records.aggregate([{ $group : {_id : "$dj", count: { $sum: 1 } } }]);
  }
});
