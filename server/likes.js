Meteor.methods({

  'toggle-like': function(recordName) {
    check(recordName, String);

    var addOrSubLike;

    if (this.userId) {
      var u = Meteor.users.findOne(this.userId, {fields: {liked: 1}});
      if (_.contains(u.liked, recordName)) {
        // liked, unlike now
        addOrSubLike = -1;
        Meteor.users.update(this.userId, {$pull: {liked: recordName}});
      } else {
        // not liked, like now
        addOrSubLike = +1;
        Meteor.users.update(this.userId, {$addToSet: {liked: recordName}});
      }
      // update record liked count
      Records.update({fname: recordName}, {$inc: {likes: addOrSubLike}});
    }
  },
});
