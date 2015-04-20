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
