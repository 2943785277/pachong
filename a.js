var http = require("http");
var url = require('url');
var util = require('util');
var hostName = '127.0.0.1';
//设置端口
var port = 8080;
//创建服务
var server = http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //req.on()
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.end();

});
server.listen(port,hostName,function(){
    console.log(`服务器运行在http://${hostName}:${port}`);
});