/*
 Banned users id tokens
*/
var schema = new SimpleSchema({
  ip: {
    type: String,
  },
  userId: {
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
