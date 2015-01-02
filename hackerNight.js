

function retrieve() {
	//reference to top stories, version 0 of the HN api
	var HNRef = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
	var baseItemURL = "http://hacker-news.firebaseio.com/v0/item/";
	var titleStr;
	var scoreStr;
	var linkUrl;
	var baseUserURL = "http://news.ycombinator.com/user?id=";
	var postTimeUnix;
	var hours=0;
	var minutes;
	var seconds;
	var postCount=1;

	var outputArea = document.getElementById("output-area");
	
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
					titleStr = itemSnapshot.val().toString();
				}
				if (itemSnapshot.key() == "url") {
					linkUrl = itemSnapshot.val();
					//outputArea.appendChild(document.createTextNode(titleStr));
					//titleStr.link(itemSnapshot.val());
					//outputArea.appendChild(document.createTextNode("\n"));
					document.write(postCount.toString() + ". ");
					postCount+=1;
					document.write(titleStr.link(itemSnapshot.val()));
					document.write("<br>");
					document.write(scoreStr + " points by " + byStr.link(baseUserURL + byStr));
					document.write(" | " + hours + "hours " + minutes + "minutes " + seconds + "seconds");
					document.write("<br>");
					document.write("<br>");
				}
				if (itemSnapshot.key() == "score") {
					scoreStr = itemSnapshot.val().toString();
				}
				if (itemSnapshot.key() == "by") {
					byStr = itemSnapshot.val().toString();
				}
				if (itemSnapshot.key() == "time") {
					postTimeUnix = itemSnapshot.val();
					var date = new Date(postTimeUnix * 1000);
					hours = date.getHours();
					minutes = "0" + date.getMinutes();
					seconds = "0" + date.getSeconds();
				}

			});
		});

	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});	
}


