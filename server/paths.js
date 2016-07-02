var fs = require('fs');

function index(request, response) {
  fs.readFile(__dirname + '/../public/index.html', function(err, data){
    if(err) throw err;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
  });
}

function pub(request, response){
  const url = request.url;
  const ext = url.split('.')[1];
  fs.readFile(__dirname + '/..' + url, (err, data) => {
    if(err) throw err;
    response.writeHead(200, {'Content-Type': 'text/' + ext});
    response.end(data);
  });
}

//export functions
module.exports = {
  index: index,
  pub: pub,
};
