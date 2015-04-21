var schema = new SimpleSchema({
  record: {                     // filename
    type: String
  },
  parent: {
    type: String,
    optional: true
  },
  t: {
    type: Date
  },
  userId: {                     // owner of msg
    type: String,
    optional: true
  },
  userTok: {                    // user token for anonymous
    type: String,
    optional: true
  },
  username: {
    type: String,
    optional: true
  },
  textHTML: {
    type: String,
  },
  rm: {
    type: Boolean,
    optional: true
  }
});

Comments = new Meteor.Collection('comments');
Comments.attachSchema(schema);
