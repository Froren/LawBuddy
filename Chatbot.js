// https://www.gupshup.io/developer/docs/bot-platform/guide/http-call-to-a-bot
export default (request) => {
    const pubnub = require('pubnub');
    const xhr = require('xhr');

    const botname = request.message.botname; // or hardcorded botname
    const responseChannel = request.message.responseChannel; // or hardcorded channel

    const message = JSON.stringify(request.message.text);
    const url = "https://www.gupshup.io/developer/bot/" + botname + "/public";
    console.log('URL is ' + url);

    const http_options = {
        "method": "POST",
        "body": "text=" + message
    };

    return xhr.fetch(url, http_options).then((response) => {
        console.log(response.body);
        pubnub.publish({
            "channel": responseChannel,
            //"message": JSON.parse(response.body)
            "message" : response.body
        });
          return request.ok();
    }).catch((reason) => {
        console.log(reason);
    });
};
