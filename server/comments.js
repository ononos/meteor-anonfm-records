Comments._ensureIndex({record: 1});
Comments._ensureIndex({t: 1});

Meteor.publish('comments', function(recordName) {
  check(recordName, String);

  var commentsOpts = {limit: CFG.MaxComments},
      commentsQuery = {record: recordName};

  if (!isAdminById(this.userId)) {
    commentsOpts.fields = {userId: 0, userTok: 0};
    commentsQuery.rm = {$ne: true};
  }

  var record = Records.find({fname: recordName}, {limit: 1}),
      comments = Comments.find(commentsQuery, commentsOpts);

  return [record, comments];
});

Meteor.publish('record-feedback', function(time, direction) {
  console.log('record-feedback', time, direction);
  var from = new Date(time);
  if (_.isNaN(from.valueOf()))
    return [];

  var commentsOpts = {
    limit: CFG.MaxComments / 2,
    sort: {t: (direction) ? 1 : -1}
  };
  var commentsQuery = {
    t: (direction) ? {$gte: from} :{$lte: from},
  };

  if (!isAdminById(this.userId)) {
    commentsOpts.fields = {userId: 0, userTok: 0};
    commentsQuery.rm = {$ne: true};
  }

  console.log('Comments.find', commentsQuery, commentsOpts);
  return Comments.find(commentsQuery, commentsOpts);
});

Meteor.methods({
  'add-comment': function(recordName, nick, text, userToken) {
    check(recordName, String);
    check(nick, String);
    check(text, String);

    if (text.length < 3)
      throw new Meteor.Error(400, 'Сообщение пустое');

    if (text.length > 5 * 1024)
      throw new Meteor.Error(400, 'Сообщение слишком длинное');

    var userId = this.userId,
        userTok;
    if (!userId) {
      var t = checkUserToken(userToken);
      if (!t)
        throw new Meteor.Error(500);
      userTok = t._id;
    }
    var userIdorTok = userId || 't' + userTok;

    if (!Throttle.checkThenSet('com-' + userIdorTok, 1, 10000)) {
      throw new Meteor.Error(500, 'Under Heavy load');
    }

    // make sure there no more 
    var commentsCount = Comments.find({record: recordName}).count();
    if (commentsCount >= CFG.MaxComments) {
      throw new Meteor.Error(403, "Этот тред содержит уже " + CFG.MaxComments + " постов, тред закрыт");
    }

    var comId = Comments.insert({ record: recordName,
                                  t: new Date(),
                                  username: nick,
                                  textHTML: marked(text),
                                  userId: userId,
                                  userTok: userTok
                                });
    if (comId)
      Records.update({fname: recordName}, {$inc: {comments: 1}});
  },

  'toggle-remove-comment': function(commentId) {
    check(commentId, String);

    if(!isAdmin())
      throw new Meteor.Error(401, 'Admin only');

    var c = Comments.findOne(commentId);
    if (c) {
      if (Comments.update(commentId, {$set: {rm: !c.rm}}))
        Records.update({fname: c.record},
                       {$inc: {comments: (c.rm) ? 1 : -1}});
    }
  },

  // remove from db
  'unlink-comment': function(commentId) {
    check(commentId, String);

    if(!isAdmin())
      throw new Meteor.Error(401, 'Admin only');

    var c = Comments.findOne(commentId);
    if (c) {
      if (Comments.remove(commentId))
          Records.update({fname: c.record},
                         {$inc: {comments: -1}});
    }
  }
});

