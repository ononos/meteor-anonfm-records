
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
  toastr.error(text);
  }
};
