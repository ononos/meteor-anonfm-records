/*
 Record sources
*/

var schema = new SimpleSchema({
  url: {
    type: String,
  },
  title: {
    type: String
  },
  rm: {
    type: Boolean,
    optional: true
  },
  update: {                     // update delay in seconds
    type: Number,
    optional: true,
  },
  lastUpdated: {                // when updated
    type: Date,
    optional: true,
  },
  msg: {                        // last error or "ok" when update
    type: String
  }
});

Sources = new Meteor.Collection('sources');

Sources.attachSchema(schema);

Sources.deny({
  update: function(userId, post, fieldNames) {
    // deny the update if it contains something other than the following fields
    return (_.without(fieldNames, 'rm').length > 0);
  }
});

Sources.allow({
  insert: isAdminById,
  remove: isAdminById,
  update: isAdminById,
});

