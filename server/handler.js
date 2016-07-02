var paths = require('./paths');

const handler = function(request, response){
  var url = request.url;//
  if(url === '/'){
    paths.index(request, response);
  } else if (url.includes('/public')){
    paths.pub(request, response)
  } else {
    response.writeHead(404);
    response.end('The URL you have requested does not exist');
  }
};

//export functions
module.exports = handler;
