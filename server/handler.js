
var urlPaths = require('./urlPaths');

const handler = function(request, response){
  var url = request.url;//
  if(url === '/'){
    urlPaths.urlPathToIndex(request, response);
  } else if (url.includes('/public')){
    urlPaths.urlPathToPublic(request, response)
  } else if (url.includes('/find')){
    urlPaths.urlPathToFind(request, response);
  } else {
    response.writeHead(404);
    response.end('WRONG!');
  }
};

//export functions
module.exports = handler;
