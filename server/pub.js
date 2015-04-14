// publication

function checkLimit(limit) {
  if (limit < 0) limit = -limit;
  if (limit > 50 || !limit)
    limit = 50;
  
  return limit;
}

Meteor.publish("files-before-ts", function(timefrom, dj, limit) {
  var query = {};

  limit = checkLimit(limit);

  if (dj && dj !== "!all")
    query.dj = dj;

  if (timefrom)
    query.t = {$lte: timefrom};

  if (!isAdmin(this.userId))
    query.rm = {$ne: true};

  console.log(query, {sort: {t: -1 }, limit: limit});
  return Records.find(query, {sort: {t: -1 }, limit: limit});
});

Meteor.publish("files-after-ts", function(timefrom, dj, limit) {
  var query = {};

  limit = checkLimit(limit);

  if (dj && dj !== "!all")
    query.dj = dj;

  if (timefrom)
    query.t = {$gt: timefrom};

  if (!isAdmin(this.userId))
    query.rm = {$ne: true};

  console.log(query, {sort: {t: 1 }, limit: limit});
  return Records.find(query, {sort: {t: 1 }, limit: limit});
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
