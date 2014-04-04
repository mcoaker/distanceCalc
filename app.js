var restify = require('restify');
 
var ip_addr = '127.0.0.1';
var port    =  '8080';
 
var server = restify.createServer({
    name : "myapp"
});
 
server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});

var PATH = '/distance'
server.get({path : PATH , version : '0.0.1'} , findDistance);

function findDistance(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    jobs.find().limit(20).sort({postedOn : -1} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }else{
            return next(err);
        }
 
    });
 
}