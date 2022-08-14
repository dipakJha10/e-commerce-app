var springedge = require('springedge');


var params = {
    'apikey': '6ojfpx3g160a1vv2279dtl3m42x9qekd', // API Key
    'sender': 'SEDEMO', // Sender Name
    'to': [
      '9815542044'  //Moblie Number
    ],
    'message': `Hello rajan, This is a test message from spring edge`,
    'format': 'json'
  };
  
  springedge.messages.send(params, 5000, function (err, response) {
    if (err) {
      return console.log(err);
    }
    console.log(response);
  });