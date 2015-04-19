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

Meteor.publish('currentUser', function() {
  var user = Meteor.users.find({_id: this.userId},
                               {fields: {
                                 createdAt: false,
                                 services: false}});
  return user;
});
