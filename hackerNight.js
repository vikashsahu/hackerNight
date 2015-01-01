

function retrieve() {
	//reference to top stories, version 0 of the HN api
	var HNRef = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
	var baseItemURL = "http://hacker-news.firebaseio.com/v0/item/";
	var titleStr = "";
	
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
					//console.log("title");
					titleStr = itemSnapshot.val().toString();
					//document.write(titleStr);
					//document.write("<br>");
					//document.write(itemSnapshot.val());
				}
				if (itemSnapshot.key() == "url") {
					//console.log("url");
					document.write(titleStr.link(itemSnapshot.val()));
					document.write("<br>");
				}
			});
		});

	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});	
}


