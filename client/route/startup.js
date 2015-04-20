LOCAL_ID = undefined;

// for not registered users create token and save it to localStorage
Meteor.startup(function(){
  LOCAL_ID = localStorage.getItem('my-id');
  if(!LOCAL_ID) {
    Meteor.call('gen-token', function(err, result) {
      if (!err) {
        LOCAL_ID = result;
        localStorage.setItem('my-id', LOCAL_ID);
      }
    });
  } else {
    Meteor.call('refresh-token', LOCAL_ID);
  }
});
