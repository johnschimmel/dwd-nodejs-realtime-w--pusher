
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

var Pusher = require('pusher');
var youtube = require('youtube-feeds');

var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});


/*
	GET /
*/
exports.index = function(req, res) {
	res.render('index.html');
};

exports.chatDisplay = function(req, res) {

	var templateData = {
		PUSHER_KEY : process.env.PUSHER_KEY
	};

	res.render('pusher_chat.html', templateData);
};

exports.chatAjaxMessage = function(req, res) {
	
	pusher.trigger(
		'chat_demo',
		'incoming_chat', 
		{ 
			message: req.body.msg
		}
	);
	res.send("message broadcasted")

}

exports.couchPotato = function(req, res){
	var templateData = {
		PUSHER_KEY : process.env.PUSHER_KEY
	};

	res.render('couch_potato.html', templateData);
};

exports.youtubeRequest = function(req, res){

	var ytQuery = req.body.query;

	youtube.feeds.videos( {q: ytQuery,order:'relevance'}, function(err,data){

		if (err) {
			console.log("ERROR");
			console.log(err);
			res.send(500, "there was an error while searching youtube");
			return

		}

		if (data && data.items.length > 0) {
			
			console.log(data);

			// get first video result
			var topVideo = data.items[0];

			// trigger broadcast
			pusher.trigger(
				'couch_potato', 
				'incoming_youtube', 
				{
					video: topVideo,
					query : ytQuery
				}
			);	

			res.send("query successful");

		} else if (data.items.length == 0){
			res.send(500,"no youtube results found");
		}


	});
	
	
};

var youtubeSearch = function(queryStr, callback) {
	
	youtube.feeds.videos( {q: queryStr,order:'relevance'}, callback(err, data));
};
