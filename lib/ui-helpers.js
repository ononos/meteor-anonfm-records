/*

 Simple helper, return text repending on condition.

 class="{{addClassIf bIsFooBar "class1"}}"

*/
UI.registerHelper('addClassIf', function (condition, classname, alterclassname) { 
  return condition ? classname : alterclassname || '';
});
