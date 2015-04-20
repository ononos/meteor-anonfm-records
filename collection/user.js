var schema = new SimpleSchema({
  username: {
    type: String
  },
  emails: {
    type: [Object],
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean,
  },
  createdAt: {
    type: Date
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  profile: {
    type: Object,
    optional: true,
    blackbox: true
  },
  isAdmin: {
    type: Boolean,
    optional: true,
  },
});

Meteor.users.attachSchema(schema);


/*

 Tokens for not registered users.
 see server/user.js

*/
var tokens = new SimpleSchema({
  created: {
    type: Date
  },
  lastUse: {
    type: Date
  }
});

UserTokens = new Meteor.Collection('tokens');
UserTokens.attachSchema(tokens);
