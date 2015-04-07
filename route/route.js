Router.configure({
  layoutTemplate: 'appLayout',
});

Meteor.startup(function () {

  Router.route('/', {
    name: 'home',
  });

});
