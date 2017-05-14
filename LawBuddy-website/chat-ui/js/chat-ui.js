$('.chat[data-chat=person2]').addClass('active-chat');
$('.person[data-chat=person2]').addClass('active');

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
// PUBLISHES THE USER'S INPUT IN THE CHAT BOX
  function publishUserMsg() {
    var userMessageInput = $('#userInput').val();
    var chatBox = document.getElementById('chat');
    var userBubble = document.createElement('div');
    userBubble.className += "bubble me";
    var userBubbleText = document.createTextNode(userMessageInput);
    userBubble.appendChild(userBubbleText);
    chatBox.appendChild(userBubble);
  }
