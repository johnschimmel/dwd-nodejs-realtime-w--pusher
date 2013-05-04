	
	// Subscribing to a channel event
	
	channel.bind('incoming_chat', function(data){
		console.log("incoming chat");
		console.log(data);
		display_new_message(data.message); //display the new message
	});

	function display_new_message(message) {
		msg_html = "<li>" + message + "</li>";
		jQuery('#chatlist').prepend(msg_html);
	}

	// attach click event to send_btn and post message via AJAX to server.
	jQuery('form#chatForm').submit(function(e){
		
		// get the user message
		var chatmsg = jQuery("#chatmsg").val();

		if (chatmsg != "") {

			// perform ajax POST to /chat
			jQuery.ajax({
				url : '/chat',
				type: 'POST',
				data: {
					msg:chatmsg
				},
				dataType : 'json',

				success : function(data) {
					console.log("received");
					console.log(data);
				},
				
				error : function(err) {
					console.error(err);
				}
			});
			// end of ajax post
			
		}
		
		e.preventDefault();
		return false;
		
	})


