
Template.filter.events({
  'click [data-action="reset"]': function(e, t) {
    Router.go('records', {dj: '!all'});
    Session.set("filter-date", undefined);
    Session.set("filter-ts-direction", false);
  }
});

var DjList = new ReactiveVar([]);
Template.DjListSelect.rendered = function() {
  var select = this.$("select");

  function createSelector(data) {
    var djs = [{id: "!all", text: "Все"}];
    djs = djs.concat (_.chain(data)
                      .sortBy(function(dj) { return -dj.count; })
                      .map(function(dj) {
                        return {
                          id: dj._id,
                          text: dj._id + ' (' + dj.count + ')'
                        };
                      })
                      .value());
    select.select2({
      placeholder: "Диджей (кол. записей)",
      data: djs
    }).on('change', function(e) {
      var dj = e.currentTarget.value;
      if (dj !== Router.current().params.dj) {
        Router.go('records', {dj: dj});
      }
    });
    select.val(Router.current().params.dj).trigger('change');
  }

  // fetch djnames if empty DjList
  if (_.isEmpty(DjList.get())) {
    Meteor.call("djnames", function(err, djs) {
      if(!err) {
        DjList.set(djs);
        createSelector(DjList.get());
      }
    });
  } else {
    createSelector(DjList.get());
  }
};

Template.datePick.rendered = function() {
  var datepicker = this.$('.date').datetimepicker({
    language: 'ru',
    format: 'yyyy-mm-dd hh:ii:ss',
    fontAwesome: true,
    autoclose: true,
    todayBtn: true,
    todayHighlight: true,
    pickerPosition: 'bottom-left'
  })
    .datetimepicker("setDate", Session.get("filter-date") || new Date())
    .on('changeDate', function(e) {
      var self = $(this);
      Meteor.defer(function() {
        if (!self.datetimepicker('visible')) {
          Session.set("filter-date", e.date);
          Session.set("filter-ts-direction", false);
        }

      });
    }).keypress(function (e) {
      if (e.which == 13) {
        if (!$(this).datetimepicker('visible')) {
          Session.set("filter-date", $(this).datetimepicker('getDate'));
        }
      }
    });
};

