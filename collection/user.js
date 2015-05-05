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
  liked: {             // record file names, better than id of records
    type: [String],
    optional: true
  }
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
  },
  liked: {             // record file names, better than id of records
    type: [String],
    optional: true
  }
});

UserTokens = new Meteor.Collection('tokens');
UserTokens.attachSchema(tokens);

LOCAL_ID = undefined;
PREVIEW_URL = undefined;

// for not registered users create token and save it to localStorage
if (Meteor.isClient)
  Meteor.startup(function(){
    // get token
    LOCAL_ID = localStorage.getItem('my-id');
    Meteor.call('token', LOCAL_ID, function(err, newToken) {
      console.log('token', err, newToken);
      if (!err && newToken) {
          LOCAL_ID = newToken;
          localStorage.setItem('my-id', LOCAL_ID);
      }
      Meteor.subscribe('currentToken', LOCAL_ID);
    });     

    // get preview url
    Meteor.call('get-preview-url', function(err, res) {
      if (err)
        Messages.error(err);
      else
        PREVIEW_URL = res;
    });
  });
