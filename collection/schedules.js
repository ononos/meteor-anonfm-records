var schema = new SimpleSchema({
  dj: {
    type: String
  },
  desc: {
    type: String
  },
  duration: {
    type: Number
  },
  addedAt: {
    type: Date
  },
  t: {
    type: Date
  },
  rm: {
    type: Boolean
  }
});

Schedules = new Meteor.Collection('schedules');
Schedules.attachSchema(schema);


Schedules.deny({
  update: function(userId, post, fieldNames) {
    // deny the update if it contains something other than the following fields
    return (_.without(fieldNames, 'rm').length > 0);
  }
});

Schedules.allow({
  update: isAdminById,
});

