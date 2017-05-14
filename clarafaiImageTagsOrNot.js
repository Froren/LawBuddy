export default (request) => { 
    const kvstore = require('kvstore');
    const xhr = require('xhr');
    
    const http_options = {
        "method": "POST",
        "headers": {
            "Authorization": "Bearer C79xcCZJeGhxJiFFi8nPQTHDpNOsCd",
            "Content-Type": "application/json"
         },
        "body": JSON.stringify({
          "inputs": [
            {
              "data": {
                "image": {
                  "url": "https://samples.clarifai.com/metro-north.jpg"
                }
              }
            }
          ]
        })
    };
    
    const url = "https://api.clarifai.com/v2/models/Law/outputs";
    console.log('request',request); // Log the request envelope passed
    return xhr.fetch(url, http_options).then((x) => {
        const body = JSON.parse(x.body);
        console.log(body);
        return request.ok();
    });   
    
    
}
