var constants = require('./config');
var restify = require('restify');
var https = require('https');

var server = restify.createServer({
    name : "distanceCalc"
});

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())
  .use(restify.queryParser());

server.listen(constants.PORT ,constants.IP_ADDR, function(){
    console.log('%s listening at %s ', server.name , server.url);
});

server.get({path : '/distance' , version : '0.0.1'} , findDistance);

function findDistance(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');

    if (req.params.from == null || req.params.to == null) {
       console.log('Invalid params');
       return res.send(400,{errorMessage:'Must specify from and to params'});
    }

    var google_path = constants.GOOGLE_PATH_INIT +
                      constants.GOOGLE_ORIGINS +
                      req.params.from.replace(/ /g, '+') + '&' +
                      constants.GOOGLE_DESTINATIONS +
                      req.params.to.replace(/ /g, '+') + '&' +
                      constants.GOOGLE_PATH_ENDING;

    var options = {
        host: constants.GOOGLE_HOST ,
        port: constants.GOOGLE_PORT ,
        path: google_path ,
        headers : {
          'Connection': 'keep-alive'
        }
    };
    
    console.log('URL: ', google_path);

    https.get(options, function(response) {
        response.on('data', function(data) {
            console.log('Response success');
            res.send(JSON.parse(data));   
        });
        response.on('error', function(e) {
            console.log('Response error: ' + e);
            return next(e);
        });

    });


}