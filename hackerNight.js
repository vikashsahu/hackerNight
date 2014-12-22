

//reference to top stories, version 0 of the HN api
var HNRef = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");

var baseItemURL = "http://hacker-news.firebaseio.com/v0/item/";
//item source
//"https://hacker-news.firebaseio.com/item/""

HNRef.on("value", function(dataSnapshot) {
	//dataSnapshot contains IDs of the top 100 stories

	//for each story ID, retrieve corresponding object
	dataSnapshot.forEach(function(childSnapshot) {

		var itemString = baseItemURL + childSnapshot.val();
		var ItemRef = new Firebase(itemString);
		ItemRef.on('child_added', function(itemSnapshot) {
			//need to display relevant information for each story, a la news.ycombinator.com
			if (itemSnapshot.key() == "title") {
				console.log(itemSnapshot.val());
			}
		});
	});


}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
});

