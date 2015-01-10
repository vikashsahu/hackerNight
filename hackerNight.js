

function retrieve(start, end) {
	//reference to top stories, version 0 of the HN api
	var HNRef = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
	var baseItemURL = "http://hacker-news.firebaseio.com/v0/item/";
	var titleStr;
	var scoreStr;
	var linkUrl;
	var baseUserURL = "http://news.ycombinator.com/user?id=";
	var baseCommentsURL = "http://news.ycombinator.com/item?id=";
	var postTimeUnix;
	var hours=0;
	var minutes;
	var seconds;
	var postCount=1;

	//var outputArea = document.getElementById("output-area");

	//item source
	//"https://hacker-news.firebaseio.com/item/""

	HNRef.once("value", function(dataSnapshot) {
		//dataSnapshot contains IDs of the top 100 stories

		//console.log(dataSnapshot[2]);

		//for each story ID, retrieve corresponding object
		dataSnapshot.forEach(function(childSnapshot) {
			//console.log(childSnapshot.val());
			var itemString = baseItemURL + childSnapshot.val();
			var ItemRef = new Firebase(itemString);
			ItemRef.once("value", function(itemSnapshot) {
				if (postCount >= start && postCount <=end) {
					titleStr = itemSnapshot.val().title.toString();
					linkUrl = itemSnapshot.val().url;
					scoreStr = itemSnapshot.val().score.toString();
					byStr = itemSnapshot.val().by.toString();
					postTimeUnix = itemSnapshot.val().time;
					
					var date = new Date(postTimeUnix * 1000);
					hours = date.getHours();
					minutes = "0" + date.getMinutes();
					seconds = "0" + date.getSeconds();

					document.getElementById("output-area").innerHTML += (postCount.toString() + ". ");
					//postCount+=1;
					document.getElementById("output-area").innerHTML += (titleStr.link(linkUrl));
					document.getElementById("output-area").innerHTML += '<br>';
					document.getElementById("output-area").innerHTML += (scoreStr + " points by " + byStr.link(baseUserURL + byStr) + " ");
					document.getElementById("output-area").innerHTML += calcTimeDiff(date);
					document.getElementById("output-area").innerHTML += (" | " + "comments".link(baseCommentsURL + childSnapshot.val()));
					document.getElementById("output-area").innerHTML += '<br>';
					document.getElementById("output-area").innerHTML += '<br>';
				
					if (itemSnapshot.key() == "kids") {
						//console.log(itemSnapshot.val());
						//document.write("kids" + itemSnapshot.val());
					}
				}
				postCount+=1;
					
			});
		});
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});	
}

function calcTimeDiff(postDateStamp) {
	var postDate = postDateStamp.getDate();//day as number, 1-31
	var postYear = postDateStamp.getFullYear();//four digit year, yyyy
	var postMonth = postDateStamp.getMonth();//0-11
	var postHours = postDateStamp.getHours();
	var postMinutes = postDateStamp.getMinutes();
	var postSeconds = postDateStamp.getSeconds();

	var currDateStamp = new Date();
	var currDate = currDateStamp.getDate();//day as number, 1-31
	var currYear = currDateStamp.getFullYear();
	var currMonth = currDateStamp.getMonth();
	var currHours = currDateStamp.getHours();
	var currMinutes = currDateStamp.getMinutes();
	var currSeconds = currDateStamp.getSeconds();


	if (currYear - postYear == 0) {//same year
		if (currMonth - postMonth == 0) {//same month
			if (currDate - postDate == 0) {//same day of month
				if (currHours - postHours == 0) {//same hour
					if (currMinutes - postMinutes == 0) {//same minute
						if (currSeconds - postSeconds == 0) {
							return ("0 seconds ago");
						} else {
							return (currSeconds - postSeconds + " seconds ago");
						}
					} else {
						return (currMinutes - postMinutes + " minutes ago");
					}
				} else {
					if (currHours - postHours == 1) {
						return (" an hour ago");
					}else {
						return (currHours - postHours + " hours ago");
					}
				}

			} else {
				if (currDate - postDate==1) {
					return (" 1 day ago");
				} else {
					return (currDate - postDate + " days ago");
				}
			}
		} else {
			return (currMonth - postMonth + " months ago");
		}
	} else {
		return (currYear - postYear + " years ago");
	}

}