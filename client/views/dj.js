var DjList = new ReactiveVar([]);
Template.DjListSelect.rendered = function() {
  var select = this.$("select");

  function createSelector(data) {
    var djs = [{id: "*", text: "Все"}];
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
    });
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
