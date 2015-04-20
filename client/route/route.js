Router.configure({
  layoutTemplate: 'appLayout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [ Meteor.subscribe('sources'),
             Meteor.subscribe('currentUser')];
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

  Router.route('/comments/:record', {
    name: "comments",

    waitOn: function() {
      return Meteor.subscribe('comments', this.params.record);
    },

    data: function() {
      var record = Records.findOne({fname: this.params.record});
      if (record)
        Session.set('filter-date', +record.t); // ensure we return to proper date
      Session.get('filter-ts-direction', false);
      return {
        record: record,
        comments: Comments.find({}, {sort: {t: -1}})
      };
    }
  });
});
