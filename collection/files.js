var schema = {};

schema.source = new SimpleSchema({
  id: {                         // foreign key to Sources._id
    type: String
  },
  url: {
    type: String,
  },
  rm: {
    type: Boolean
  }
});

schema.main = new SimpleSchema({
  addedAt: {
    type: Date
  },
  timestamp: {
    type: Date
  },
  dj: {
    type: String
  },
  name: {                       // file name
    type: String
  },
  size: {                       // file size
    type: Number
  },
  sources: {
    type: [schema.source],
    optional: true,
  },
  bitrate: {
    type: Number
  },
  duration: {
    type: Number,
  },
  hasPreview: {
    type: Boolean
  },

  rm: {                         // just hide (remove from view)
    type: Boolean
  },
});

Files = new Meteor.Collection('files');
Files.attachSchema(schema.main);


Files.deny({
  update: function(userId, post, fieldNames) {
    // deny the update if it contains something other than the following fields
    return (_.without(fieldNames, 'rm').length > 0);
  }
});

Files.allow({
  update: isAdminById,
});

if (Meteor.isServer) {
  Files._ensureIndex({timestamp: 1, name: 1});
  Files._ensureIndex({dj: 1});
  //Files._ensureIndex({timestamp: 1, name: 1});
}
