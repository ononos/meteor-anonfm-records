// publication

Meteor.publish("current-file", function(recordId) {
  if (recordId instanceof Meteor.Collection.ObjectID)
    return Records.find({_id: recordId});
  else
    return [];
});

Meteor.publish("next-file", function(recordId, onlyThisDj) {
  if (!(recordId instanceof Meteor.Collection.ObjectID))
    return [];

  var cur = Records.findOne({_id: recordId});
  if (cur) {
    var query = {
      t: {$gt: cur.t},
      isSch: {$ne: true}
    };
    if (onlyThisDj)
      query.dj = cur.dj;
    return Records.find(query, {sort: {t: 1}, limit: 1});
  }
  else
    return [];
});

function checkLimit(limit) {
  if (limit < 0) limit = -limit;
  if (limit > CFG.MaxRecs || !limit)
    limit = CFG.MaxRecs;
  
  return limit;
}

Meteor.publish("files-before-ts", function(timefrom, dj, limit) {
  var query = {};

  limit = checkLimit(limit);

  if (dj && dj !== "!all")
    query.dj = dj;

  if (timefrom)
    query.t = {$lte: new Date(timefrom)};

  if (!isAdminById(this.userId))
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
    query.t = {$gt: new Date(timefrom)};

  if (!isAdminById(this.userId))
    query.rm = {$ne: true};

  console.log(query, {sort: {t: 1 }, limit: limit});
  return Records.find(query, {sort: {t: 1 }, limit: limit});
});

Meteor.publish("my-liked", function(userToken, page) {
  page = Number(page);

  var liked = [],
      pageSize = CFG.MaxRecs,
      startFrom = pageSize * (page || 0);

  // get user's liked records array. it may be in users, or usertokens collection
  var u;
  if (this.userId)
    u = Meteor.users.findOne(this.userId, {fields: {liked: 1}});
  if (!u) {
    if (userToken)
      u = UserTokens.findOne(userToken);
  }
  if (u && u.liked)
    liked = u.liked;
  else
    return [];

  console.log('liked1',startFrom, startFrom + pageSize, liked);
  liked = liked.slice(startFrom, startFrom + pageSize);
  console.log('liked2',liked);
  var query = {fname: {$in: liked}};
  if (!isAdminById(this.userId))
    query.rm = {$ne: true};

  return Records.find(query);
});

Meteor.publish("sources", function() {
  var query = {},
      options = {};

  if (!isAdminById(this.userId)) {
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
