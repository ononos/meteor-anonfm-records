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
    options.fields = {url: 1, title: 1, lastUpdated: 1};
  }

  Counts.publish(this, 'best',
                 Records.find({likes: {$gt: 0}}),
                 { noReady: true });

  Counts.publish(this, 'commentedNum',
                 Records.find({comments: {$gt: 0}}),
                 { noReady: true });

  return Sources.find(query, options);
});

var AGGREGATE_CACHE = {};

// clear cache each day
Meteor.setInterval(function() {  AGGREGATE_CACHE = {}; }, 24 * 3600000);

// dj record count
function get_dj_stats() {
  if (!AGGREGATE_CACHE.djstats)
    AGGREGATE_CACHE.djstats = Records.aggregate(
      [
        { '$match': { isSch: { '$ne': true } } },
        {
          '$group': {
            _id      : '$dj',
            count    : { '$sum': 1 },
            size     : { '$sum': '$size' },
            duration : { '$sum': '$duration' }
          }
        },
        {'$sort': {duration: -1}}
      ]);
  return AGGREGATE_CACHE.djstats;
}

function get_weekstats() {
  if (!AGGREGATE_CACHE.weekstats)
    AGGREGATE_CACHE.weekstats = Records.aggregate(
      [
        { '$match': { isSch: { '$ne': true } } },
        {
          '$group': {
            _id      : { day   : { '$dayOfWeek': '$t' }, dj: '$dj' },
            count    : { '$sum': 1 },
            size     : { '$sum': '$size' },
            duration : { '$sum': '$duration' }
          }
        },
      ]);
  return AGGREGATE_CACHE.weekstats;
}

function get_months_stats() {
  if (!AGGREGATE_CACHE.perMonth)
    AGGREGATE_CACHE.perMonth = Records.aggregate(
      [
        { '$match': { isSch: { '$ne': true } } },
        {
          '$group': {
            _id      : { y: { $year: '$t' },
                         m: { $month: '$t' }},
            count    : { '$sum': 1 },
            size     : { '$sum': '$size' },
            duration : { '$sum': '$duration' }
          },
        },
        {'$sort': {'_id.y': 1, '_id.m': 1}}
      ]);
  return AGGREGATE_CACHE.perMonth;
}


function get_sources_stats() {
  if (!AGGREGATE_CACHE.perSource) {
    AGGREGATE_CACHE.perSource = Records.aggregate(
      [
        { '$match': { isSch: { '$ne': true } } },
        { $unwind: '$sources'},
        {
          '$group': {
            _id      : '$sources.id',
            count    : { '$sum': 1 },
            size     : { '$sum': '$size' },
            duration : { '$sum': '$duration' }
          },
        },
      ]);
    // replace ObjectID to meteor mongo id
    AGGREGATE_CACHE.perSource = _.map(AGGREGATE_CACHE.perSource, function(it) {
      it._id = new Mongo.ObjectID( '' + it._id );
      return it;
    });
  }
  return AGGREGATE_CACHE.perSource;
}

Meteor.methods({
  djnames : function () {
     return get_dj_stats();
  },

  'get-stats': function() {
    return {
      perDj: get_dj_stats(),
      perWeekDay: get_weekstats(),
      perMonth: get_months_stats(),
      perSource: get_sources_stats()
    };
  }
});
