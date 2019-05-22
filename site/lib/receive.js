let fs = require('fs');


module.exports = {
  readBody: function (postHandler, request, response) {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
        console.log(body);
//      let bodyJSON = JSON.parse(body);
//      postHandler(bodyJSON, request, response);
        fs.writeFile('image.jpg', body, error => {
            if(error) {
                console.log(error);
                response.end();
            }
        else {
            response.end(filename);
        }
    });
    });
  }
};