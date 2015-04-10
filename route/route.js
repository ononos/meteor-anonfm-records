Router.configure({
  layoutTemplate: 'appLayout',
});

Meteor.startup(function () {

  Router.route('/', function (){
    this.redirect('records', {dj: "!all"});
  });

  Router.route('/records/:dj', {
    name: 'records',
    waitOn: function() {
      return Meteor.subscribe('files', Session.get('filter-date'), this.params.dj);
    },
    data: function() {
      return Records.find({},{sort: {timestamp: -1}});
    }
  });

});
