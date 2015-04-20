Template.comment.events({
  'click [data-action="toggle-remove"]': function(e, t) {
    Meteor.call('toggle-remove-comment', this._id, Messages.error);
  },

  // remove forever
  'click [data-action="unlink"]': function(e, t) {
    if (confirm("Remove comment?"))
      Meteor.call('unlink-comment', this._id, Messages.error);
  },

});

/*
 * New comment form
 */

Template.newComment.created = function() {
  this.vPosting = new ReactiveVar(false); // upload post
};

Template.newComment.rendered = function() {
  // build preview of markup on type
  var previewArea = this.$('#preview');
  this.$('textarea').on('keyup paste', _.debounce(function(e) {
    var text = e.currentTarget.value;
    preview.innerHTML = marked(text);
  }, 1000));
};

Template.newComment.helpers({
  posting: function() { return Template.instance().vPosting.get(); }
});

Template.newComment.events({
  'click [data-action="newpost"]': function(e, t) {
    e.preventDefault();

    var nick = t.find('[name="username"]').value,
        text = t.find('textarea').value;

    t.vPosting.set(true);
    Meteor.call('add-comment', this.ctx.record.fname, nick, text, LOCAL_ID, function(err) {
      t.vPosting.set(false);
      if(err) {
        Messages.error(err);
      } else {
        t.find('form').reset();
        t.find('#preview').innerHTML = '';
      }
    });
  },
});
