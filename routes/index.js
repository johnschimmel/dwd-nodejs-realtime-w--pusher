
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

var Pusher = require('pusher');

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
	
	pusher.trigger( 'chat_demo', 'incoming_chat', { message: req.body.msg } );
	res.send("message broadcasted")
	
}
