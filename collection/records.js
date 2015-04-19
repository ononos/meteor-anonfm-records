var schema = {};

schema.source = new SimpleSchema({
  id: {                         // foreign key to Sources._id
    type: Meteor.Collection.ObjectID
  },
  url: {
    type: String,
  },
  rm: {
    type: Boolean
  }
});

schema.main = new SimpleSchema({
  // schedule:
  isSch: {
    type: Boolean,
  },
  schedule: {                   // schedule name
    type: String,
  },
  schTime: {                    // REAL TIMESTAMP of schedule
    type: Date,
  },
  // schedule and record:
  addedAt: {
    type: Date
  },
  t: { // time stamp of records or schedule (+15 minutes because dj may start before schedul started)
    type: Date
  },
  dj: {
    type: String
  },
  duration: {
    type: Number,
  },
  rm: {                         // just hide (remove from view)
    type: Boolean,
    optional: true,
  },
  // record:
  schOk: {                      // is this record under schedule?
    type: Boolean,
  },
  schOkAdm: {                   // forced by admin to be schedule
    type: Boolean,
    optional: true,
  },
  fname: {                      // file name if record
    type: String,
  },
  size: {                       // file size
    type: Number
  },
  sources: {
    type: [schema.source],
  },
  bitrate: {
    type: Number
  },
  hasPreview: {
    type: Boolean
  },
});

Records = new Meteor.Collection('files');
Records.attachSchema(schema.main);


Records.deny({
  update: function(userId, post, fieldNames) {
    // deny the update if it contains something other than the following fields
    return (_.without(fieldNames, 'rm', 'schOkAdm').length > 0);
  }
});

Records.allow({
  update: isAdminById,
});

if (Meteor.isServer) {
  Records._ensureIndex({dj: 1, t: 1});
  Records._ensureIndex({t: 1});
  Records._ensureIndex({dj: 1});
}
