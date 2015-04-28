var djstat = new SimpleSchema({
  _id: {
    type: String
  },
  count: {
    type: Number
  },
  duration: {
    type: Number
  }
});

var weekstat = new SimpleSchema({
  _id: {
    type: [Object],
  },
  '_id.day': {
    type: Number
  },
  '_id.dj': {
    type: String
  },
  count: {
    type: Number
  },
  duration: {
    type: Number
  }
});

Stats = {};

Stats.perDj = new  Meteor.Collection('djstats');
Stats.perDj.attachSchema(djstat);

Stats.perWeekDay = new Meteor.Collection('weekstats');
Stats.perWeekDay.attachSchema(weekstat);
