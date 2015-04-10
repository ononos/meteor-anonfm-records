// publication

Meteor.publish("files", function(timefrom, dj) {
  var query = {};

  if (timefrom)
    query.t = {$lte: timefrom};
  if (dj && dj !== "!all")
    query.dj = dj;
  console.log(query);
  return Records.find(query, {sort: {t: -1 }, limit: 50});
});

Meteor.methods({
  djnames : function () {
    // TODO: cache this
    return Records.aggregate([{ $group : {_id : "$dj", count: { $sum: 1 } } }]);
  }
});
