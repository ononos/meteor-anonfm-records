// date format for route /feed
feedDateFormat = "YYYY-MM-DD__HH_mm_ss";

Router.configure({
  layoutTemplate: 'appLayout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [ Meteor.subscribe('core'),
             Meteor.subscribe('currentUser')];
  }
});


Meteor.startup(function () {

  Router.route('/', function (){
    this.redirect('records', {dj: "!all"});
  });

  Router.route('/records/:dj', {
    name: 'records',
    template: "recordsTimes",
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
      return {
        records: Records.find({},{sort: {t: -1}})
      };
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

  Router.route('/liked', function (){
    this.redirect('myLiked', {page: "0"});
  });

  Router.route('/liked/:page', {
    name: "myLiked",

    waitOn: function() {
      return Meteor.subscribe("my-liked", LOCAL_ID, this.params.page);
    },

    data: function() {
      return { records: Records.find({}, {sort: {t: -1}}),
               page: this.params.page
             };
    }
  });

  Router.route('/best', function (){
    this.redirect('topBest', {page: "0"});
  });

  Router.route('/best/:page', {
    name: "topBest",

    waitOn: function() {
      return Meteor.subscribe("best", this.params.page);
    },

    data: function() {
      return { records: Records.find({}, {sort: [['likes', 'desc'], ['t', 'desc']]}),
               page: this.params.page
             };
    }
  });

  Router.route('/commented', function (){
    this.redirect('topCommented', {page: "0"});
  });

  Router.route('/commented/:page', {
    name: "topCommented",

    waitOn: function() {
      return Meteor.subscribe("top-commented", this.params.page);
    },

    data: function() {
      return { records: Records.find({}, {sort: [['comments', 'desc'], ['t', 'desc']]}),
               page: this.params.page
             };
    }
  });

  Router.route('/feed', function (){
    this.redirect('latestFeed', {date: moment().format(feedDateFormat), dir: 'later'});
  });

  Router.route('/feed/:dir/:date', {
    name: "latestFeed",

    waitOn: function() {
      var time = moment(this.params.date, feedDateFormat).valueOf(),
          direction = (this.params.dir === 'later') ? false : true;

      return Meteor.subscribe("record-feedback", time, direction);
    },

    data: function() {
      return {
        comments: Comments.find({}, {sort: {t: -1}})
      };
    }
  });
});
