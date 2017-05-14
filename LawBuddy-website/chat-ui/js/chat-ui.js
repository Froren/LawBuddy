$('.chat[data-chat=person2]').addClass('active-chat');
$('.person[data-chat=person2]').addClass('active');

const input = $('#userInput');

// CREATE PUBNUB CONNECTION
const pubnub = new PubNub({ publishKey : 'pub-c-793237f1-ee68-427e-874b-1a4363e8862b', subscribeKey : 'sub-c-9c152790-3825-11e7-b611-0619f8945a4f' });
const channel = 'pubnub-law-analysis1';

pubnub.addListener({
  message: function(obj) {
	  
	  var message = "";
	  if (obj.message.outputTopics !== "") {
		 message = "Let me search for some of the related topics I found: " + obj.message.outputTopics;
	  } else {
		 message = "Sorry, I couldn't find a relevant topic to help you with. Please try describing your issue differently.";
	  }
	  
	  appendMessage(message);
  }});

pubnub.subscribe({channels:[channel]});

$('.left .person').mousedown(function(){
    if ($(this).hasClass('.active')) {
        return false;
    } else {
        var findChat = $(this).attr('data-chat');
        var personName = $(this).find('.name').text();
        $('.right .top .name').html(personName);
        $('.chat').removeClass('active-chat');
        $('.left .person').removeClass('active');
        $(this).addClass('active');
        $('.chat[data-chat = '+findChat+']').addClass('active-chat');
    }
});

	function appendMessage(message) {
		var chatBox = document.getElementById('chat');
		var userBubble = document.createElement('div');
		userBubble.className += "bubble me";
		var userBubbleText = document.createTextNode(message);
		userBubble.appendChild(userBubbleText);
		chatBox.appendChild(userBubble);
	}
	
// PUBLISHES THE USER'S INPUT IN THE CHAT BOX
  function publishUserMsg() {
    var userMessageInput = $('#userInput').val();
	appendMessage(userMessageInput);
    $('#userInput').val('');
// PUBLISHES MESSAGE TO PUBNUB
    pubnub.publish({channel: channel, message : {text: userMessageInput}});
  }

  input.bind('keyup', function(e) {
    if ((e.keyCode || e.charCode) === 13)
        publishUserMsg();
  });
