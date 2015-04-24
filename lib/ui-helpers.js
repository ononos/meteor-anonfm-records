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

// return 'active' if route start at given string
UI.registerHelper('activeRouteAt', function (routeName) { 
  console.log('route check', Router.current().location.get().path, routeName,
              Router.current().location.get().path.indexOf(routeName) === 0);
  if (Router.current() &&
      Router.current().location.get().path.indexOf(routeName) === 0)
    return 'active';
  else
    return '';
});

UI.registerHelper("connected", function(argument){
  return Meteor.status().connected;
});
