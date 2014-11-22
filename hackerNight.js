

//reference to version 0 of the HN api
var HNRef = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");

//var HNRef = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts")

HNRef.on("value", function(snapshot) {
	console.log(snapshot.val());
}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
});