Router.configure({
  layoutTemplate: 'appLayout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('sources');
  }
});

Meteor.startup(function () {

  Router.route('/', function (){
    this.redirect('records', {dj: "!all"});
  });

  Router.route('/records/:dj', {
    name: 'records',
    waitOn: function() {
      var direction   = Session.get('filter-ts-direction') || false,
          itemsAfter  = direction ? CFG.MaxRecs - CFG.ScrollMargin
                                  : CFG.ScrollMargin,
          itemsBefore = CFG.MaxRecs - itemsAfter,
          ts          = Session.get('filter-date');

      return [ Meteor.subscribe('files-before-ts', ts, this.params.dj, itemsBefore),
               Meteor.subscribe('files-after-ts', ts, this.params.dj, itemsAfter)
             ];
    },
    data: function() {
      return Records.find({},{sort: {t: -1}});
    }
  });

});
