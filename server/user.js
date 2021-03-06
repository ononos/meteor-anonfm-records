// Accounts.validateLoginAttempt()

Throttle.setMethodsAllowed(false);

ThrottleAccounts.login('global', 20, 1000, 'Under Heavy Load - too many login attempts');
ThrottleAccounts.login('connection', 8, 10000, 'Under Heavy Load - too many login attempts');

// Accounts.validateNewUser()
ThrottleAccounts.create('global', 10, 10000, 'Under Heavy Load - too many accounts created');

// If first user - that it became admin
Accounts.onCreateUser(function(options, user) {
  if (Meteor.users.find({}, {limit: 2}).count() === 0) {
    user.isAdmin = true;
    console.log("!! First user " + user.username + " became to admin!");
  }
  return user;
});

Meteor.startup(function () {
  Accounts.emailTemplates.from = 'Anonfm Archive <no-reply@ononos.tk>';
});

// Helper.
// return token UserTokens record or null if not found and not old enough
function getUserFromTokenAndCheck(userToken) {
  if (_.isUndefined(userToken))
    return false;
  // try find user with that token. make sure token old (15min)
  var u = UserTokens.findOne(userToken);
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
      userIdSlug = mkBanUserIdSlug(userId, userToken);
  
  if (!userId && !userTokenRecord) {
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

/**
 * @param {ips: array, userIds: array} userData
 */
Meteor.publish('bans', function(userData) {
  if (!isAdminById(this.userId)) {
    return [];
  }
  return Bans.find({$or:
                    [
                      {ip: {$in: _.unique(userData.ips)}},
                      {userId: {$in: _.unique(userData.userIds)}}
                    ]});
});

// user related methods
Meteor.methods({
  // create token
  'token': function(oldToken) {
    var ip = headers.methodClientIP(this);

    if (!Throttle.checkThenSet('gen-token/' + ip, 2, 60000)) {
      throw new Meteor.Error(500, 'Under Heavy load');
    }

    if (!Throttle.checkThenSet('global-token', 10, 6000)) {
      throw new Meteor.Error(500, 'Under Heavy load');
    }

    var now = new Date();
    if (!_.isUndefined(oldToken) && UserTokens.update({_id: oldToken}, {$set: {lastUse: now}})) {
      return false;
    } else {
      return UserTokens.insert({created: now, lastUse: now});
    }
  },

  'remove-bans': function(ip, userIdSlug) {
    if (!isAdminById(this.userId))
      return;

    console.log('remove-bans', ip, userIdSlug);

    if (_.isString(ip))
      Bans.remove({ip: ip});

    if (_.isString(userIdSlug))
      Bans.remove({userId: userIdSlug});
  }
});
