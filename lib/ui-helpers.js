/*

 Simple helper, return text repending on condition.

 class="{{addClassIf bIsFooBar "class1"}}"

*/
UI.registerHelper('addClassIf', function (condition, classname, alterclassname) {
  return condition ? classname : "";
});

// class="{{addClassIf bIsFooBar "class1" "class2"}}"
UI.registerHelper('addClassIf2', function (condition, classname, alterclassname) {
  return condition ? classname : alterclassname;
});

// or ||
UI.registerHelper('Or', function (variable, defaultVal) {
  return variable || defaultVal;
});

// true if user is admin
UI.registerHelper('isAdmin', function() {
  return isAdmin(Meteor.user());
});

UI.registerHelper('timeAgo', function(datetime) {
  return moment(datetime).fromNow();
});

UI.registerHelper('formatDate', function(datetime, format) {
  return moment(datetime).format(format);
});
