/*
 Banned users id tokens
*/
var schema = new SimpleSchema({
  ip: {
    type: String,
  },
  userId: {                     // slug, 't' + token or 'i' + Meteor.userId(). Use mkBanUserIdSlug()
    type: String,
  },
  expire: {
    type: Date
  },
  reason: {
    type: String
  }
});

Bans = new Meteor.Collection('bans');
Bans.attachSchema(schema);

Bans.allow({
  insert: isAdminById,
  remove: isAdminById,
});

if (Meteor.isServer) {
  Bans._ensureIndex({ip: 1});
  Bans._ensureIndex({userId: 1});
  Bans._ensureIndex({expire: 1}, {expireAfterSeconds: 0});
}

// make userId slug for ban record
mkBanUserIdSlug = function(userId, token) {
  return userId ? 'i' + userId : 't' + token;
};
