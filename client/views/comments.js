Template.comment.events({
  'click [data-action="toggle-remove"]': function(e, t) {
    Meteor.call('toggle-remove-comment', this._id);
  }
});

Template.newComment.created = function() {
  this.vPosting = new ReactiveVar(false);
};

Template.newComment.helpers({
  posting: function() { return Template.instance().vPosting.get(); }
});

Template.newComment.events({
  'click [data-action="newpost"]': function(e, t) {
    e.preventDefault();

    var nick = t.find('[name="username"]').value,
        text = t.find('textarea').value,
        form = t.find('form');

    console.log(nick, text);
    t.vPosting.set(true);
    console.log(this);
    Meteor.call('add-comment', this.ctx.record.fname, nick, text, LOCAL_ID, function(err) {
      t.vPosting.set(false);
      if(err) {

      } else {
        form.reset();
      }
    });

  }
});
