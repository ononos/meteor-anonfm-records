// Accounts.validateLoginAttempt()
Throttle.debug = false;
ThrottleAccounts.login('global', 20, 1000, 'Under Heavy Load - too many login attempts');
ThrottleAccounts.login('connection', 8, 10000, 'Under Heavy Load - too many login attempts');

// Accounts.validateNewUser()
ThrottleAccounts.create('global', 10, 10000, 'Under Heavy Load - too many accounts created');

Throttle._ensureIndex({key: 1});

// If first user - that it became admin
Accounts.onCreateUser(function(options, user) {
  if (Meteor.users.find({}, {limit: 2}).count() === 0) {
    user.isAdmin = true;
    console.log("!! First user " + user.username + " became to admin!");
  }
  return user;
});

// Helper.
// return token UserTokens record or null if not found and not ready
function getUserFromTokenAndCheck(userToken) {
  if (_.isUndefined(userToken))
    return false;
  // try find user with that token. make sure token old (15min)
  var u = UserTokens.findOne(userToken);
  console.log('check', +u.created,  +new Date() - 15 * 60000);
  if (!u || (+u.created > +new Date() - 15 * 60000))
    throw new Meteor.Error(500, 'Вы похоже совсем не давно здесь. Нюфагу лучше осмотреться.');

  return u;
}

/**
 * Check user for ban
 *
 */
methodCheckBan = function(userToken) {
  var userId = this.userId,
      ip = headers.methodClientIP(this),
      userTokenRecord = userId ? "" : getUserFromTokenAndCheck(userToken),
      userIdSlug = 'i' + userId;
  
  if (!userId) {
    if (userTokenRecord)
      userIdSlug = 't' + userToken;
    else
      throw new Meteor.Error(401); // no token? strange
  }

  var BanRecord = Bans.findOne({$or: [{ip: ip}, {userId: userIdSlug}]});

  if (BanRecord)
    throw new Meteor.Error(403, 'Вы забанены. Причина: "' + BanRecord.reason +
                           '". Бан действует на <strong>' +
                           moment.duration(moment().diff(BanRecord.expire)).humanize() + '</strong>');

  return { ip: ip,
           userId: userIdSlug
         };
};

/**
 * Throttle user activity and ban
 * @this Meteor.method
 *
 * @param {string} throttlePrefix - short throttle prefix
 * @param {string} userToken
 * @param {number} allowedCount
 * @param {number} expireInMS
 * @param {(number|moment.duration())} banExpire
 * @param {string} banReason
 *
 * @return {{ip, userId}} Where where userId is 't' + token or 'i' + userId
 *
 * @throws {Meteor.Error} Ban reason
 */
methodThrottleBan = function(throttlePrefix, userToken, allowedCount, expireInMS, banExpire, banReason) {
  var checkedUser = methodCheckBan.call(this, userToken);

  if (!Throttle.checkThenSet(throttlePrefix + checkedUser.ip, allowedCount, expireInMS) ||
      !Throttle.checkThenSet(throttlePrefix + checkedUser.userId, allowedCount, expireInMS)) {

    var expire = moment().add(banExpire).toDate();
    Bans.insert({
      ip: checkedUser.ip,
      userId: checkedUser.userId,
      expire: expire,
      reason: banReason
    });

    throw new Meteor.Error(500, 'Вы забанены на ' +
                           moment.duration(moment().diff(expire)).humanize() + '. Причина: ' + banReason);
  }
  return checkedUser;
};

// publish current user's data
Meteor.publish('currentUser', function() {
  var user = Meteor.users.find({_id: this.userId},
                               {fields: {
                                 createdAt: false,
                                 services: false}});
  return user;
});

Meteor.publish('currentToken', function(token) {
  if (_.isUndefined(token))
    return [];
  var t = UserTokens.find({_id: token},
                          {fields: {
                            liked: true}});
  return t;
});

// user related methods
Meteor.methods({
  // create token
  'gen-token': function() {
    if (!Throttle.checkThenSet('gen-token/' + this.connection.id, 2, 60000)) {
      throw new Meteor.Error(500, 'Under Heavy load');
    }

    if (!Throttle.checkThenSet('global-token', 10, 6000)) {
      throw new Meteor.Error(500, 'Under Heavy load');
    }

    var now = new Date();
    return UserTokens.insert({created: now, lastUse: now});
  },

  // keep alive this token, update lastUse date
  'refresh-token': function(tok) {
    check(tok, String);
    if (!Throttle.checkThenSet('update-tok/' + this.connection.id, 1, 60000)) {
      throw new Meteor.Error(500, 'Under Heavy load');
    }

    UserTokens.update(tok, {$set: {lastUse: new Date()}});
  },
});
