
isAdmin=function(user){
  user = (typeof user === 'undefined') ? Meteor.user() : user;
  return !!user && !!user.isAdmin;
};

isAdminById=function(userId){
  var user = Meteor.users.findOne(userId);
  return !!(user && isAdmin(user));
};

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 */
Math.clamp = function(number, min, max) {
return Math.min(Math.max(number, min), max);
};

// helper for msg
Messages = {
  error: function(err) {
    var text = (typeof err === 'object') ? err.reason : err;
    if (!_.isEmpty(text))
      toastr.error(text);
  },
  success: function(msg) {
    toastr.success(msg);
  },
  info: function(msg) {
    toastr.info(msg);
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
