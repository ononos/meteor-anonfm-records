
isAdmin=function(user){
  user = (typeof user === 'undefined') ? Meteor.user() : user;
  return !!user && !!user.isAdmin;
};

isAdminById=function(userId){
  var user = Meteor.users.findOne(userId);
  return !!(user && isAdmin(user));
};

// helper for msg
Messages = {
  error: function(err) {
    var text = (typeof err === 'object') ? err.reason : err;
    if (!_.isEmpty(text))
      toastr.error(text);
  }
};

if (Meteor.isClient) {
  // return liked field from current user or current local tokenned user
  getMyLikedRecords = function() {
    var user = Meteor.user();
    if (!user) {
      if (LOCAL_ID)
        user = UserTokens.findOne(LOCAL_ID);
    }
    if (user && user.liked)
      return user.liked;
    else
      return [];
  };
}
