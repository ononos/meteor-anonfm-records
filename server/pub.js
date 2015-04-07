// publication

Meteor.publish("files", function(timefrom, dj) {
  var query = {};
  timefrom = timefrom || new Date();
  query.timestamp = {$lte: timefrom};
  if (dj)
    query.dj = dj;

  return Files.find(query, {limit: 50});
});

Meteor.methods({
  djnames : function () {
    // TODO: cache this
    return Files.aggregate([{ $group : {_id : "$dj", count: { $sum: 1 } } }]);
  }
});
