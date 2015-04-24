Template.comment.onCreated(function() {
  this.showBanForm = ReactiveVar(false);
});

Template.comment.events({
  'click [data-action="toggle-remove"]': function(e, t) {
    Meteor.call('toggle-remove-comment', this._id, Messages.error);
  },

  // remove forever
  'click [data-action="unlink"]': function(e, t) {
    if (confirm("Remove comment?"))
      Meteor.call('unlink-comment', this._id, Messages.error);
  },

  'click [data-action="unban"]':
  _.throttle(function(e, t)
             {
               Meteor.call("remove-bans", this.ip, mkBanUserIdSlug(this.userId, this.userTok), Messages.error);
             }, 700),

  'click [data-action="ban"]': function(e, t) {
    t.showBanForm.set(!t.showBanForm.get());
  }
});

Template.comment.helpers({
  showBanForm: function() { return Template.instance().showBanForm.get(); },

  showBanFormVar: function() { return Template.instance().showBanForm; },

  authorBanned: function() {
    return Bans.findOne({$or:
                         [ {ip: this.ip},
                           {userId: mkBanUserIdSlug(this.userId, this.userTok)}
                         ]});
  },
  
  bannedExpire: function() {
    var ban = Bans.findOne({$or:
                            [ {ip: this.ip},
                              {userId: mkBanUserIdSlug(this.userId, this.userTok)}
                            ]});

    return moment.duration(moment().diff(ban.expire)).humanize();
  }
});

Template.banCommentAuthor.onRendered(function() {
  this.$('select').select2({placeholder: "на сколько бан?"});
});

Template.banCommentAuthor.events({
  'click [data-action="commit-ban"]': function(e, t) {
    e.preventDefault();

    var ip = this.ctx.ip,
        userId_or_Tok = mkBanUserIdSlug(this.ctx.userId, this.ctx.userTok),
        reason = t.find('textarea').value,
        expireSeconds = t.find('select').value,
        expire = moment().add(expireSeconds * 1000).toDate();

    Bans.insert({
      ip: ip,
      userId: userId_or_Tok,
      expire: expire,
      reason: reason
    }, Messages.error);

    this.showBanFormVar.set(false); //hide form
  }
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
