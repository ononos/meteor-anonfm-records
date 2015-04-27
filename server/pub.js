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

  return Records.find(query, {sort: {t: 1 }, limit: limit});
});

Meteor.publish("my-liked", function(userToken, page) {
  page = Number(page);

  if (page < 0)
  return [];

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

  liked = liked.slice(startFrom, startFrom + pageSize);
  var query = {fname: {$in: liked}};
  if (!isAdminById(this.userId))
    query.rm = {$ne: true};

  return Records.find(query);
});

Meteor.publish("best", function(page) {
  page = Number(page);

  if (page > CFG.MaxPages || page < 0)    // limit
    return [];

  return Records.find({likes: {$gt: 0}},
                      {
                        skip: page * CFG.MaxRecs,
                        limit: CFG.MaxRecs,
                        sort: [['likes', 'desc'], ['t', 'desc']],
                     });
});

Meteor.publish("top-commented", function(page) {
  page = Number(page);

  if (page > CFG.MaxPages || page < 0)    // limit
    return [];

  return Records.find({comments: {$gt: 0}},
                      {
                        skip: page * CFG.MaxRecs,
                        limit: CFG.MaxRecs,
                        sort: [['comments', 'desc'], ['t', 'desc']],
                     });
});

Meteor.publish("core", function() {
  var query = {},
      options = {};

  if (!isAdminById(this.userId)) {
    query.rm = {$ne: true};
    options.fields = {url: 1, title: 1};
  }

  Counts.publish(this, 'best',
                 Records.find({likes: {$gt: 0}}),
                 { noReady: true });

  Counts.publish(this, 'commentedNum',
                 Records.find({comments: {$gt: 0}}),
                 { noReady: true });

  return Sources.find(query, options);
});

Meteor.methods({
  djnames : function () {
    // TODO: cache this
    return Stats.perDj.find().fetch();
  },

  'get-stats': function() {

    return {
      perDj: Stats.perDj.find({}, {sort: {count: -1}}).fetch(),
    };
  }
});
