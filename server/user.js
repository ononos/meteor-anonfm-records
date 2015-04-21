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

// return token UserTokens record or null if not found and not ready
checkUserToken = function(userToken) {
  if (_.isUndefined(userToken))
    return false;
  // try find user with that token. make sure token old (15min)
  var u = UserTokens.findOne(userToken);
  
  if (!(u && u.created < new Date() - 15 * 60000))
    return false;

  return u;
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
    console.log(this.connection);
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
