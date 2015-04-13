Package.describe({
  summary: "Uppod player",
  version: "0.0.1"
});

Package.onUse(function(api) {
  api.addFiles('uppod_unwrap.js', 'client');
});
 
