Meteor.methods({

  'toggle-like': function(recordName, token) {
    check(recordName, String);

    var addOrSubLike, userCollection, id;

    var checkedUser = methodThrottleBan.call(this, 'like-', token,
                                             20, 10000,
                                             moment.duration({'days' : 2}),
                                             "Лайк вайпинг");

    if (this.userId) {
      var u = Meteor.users.findOne(this.userId, {fields: {liked: 1}});
      if (!u)
        throw new Meteor.Error(500);

      userCollection = Meteor.users;
      id = this.userId;
      addOrSubLike = _.contains(u.liked, recordName) ? -1 : +1;
    } else {
      // anonymous
      check(token, String);
      var t = UserTokens.findOne(token);
      if (!t)
        throw new Meteor.Error(500);

      userCollection = UserTokens;
      id = token;
      addOrSubLike = _.contains(t.liked, recordName) ? -1 : +1;
    }

    if (addOrSubLike > 0)
      userCollection.update(id, {$addToSet: {liked: recordName}});
    else
      userCollection.update(id, {$pull: {liked: recordName}});

    // update record liked count
    Records.update({fname: recordName}, {$inc: {likes: addOrSubLike}});

  },
});
