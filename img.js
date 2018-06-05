//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
var async = require('async');

//for(var i = 2;i<8;i++){
	//console.log(i)
	// 目标网址
	var url = 'http://www.acfun.cn/v/list108/index.htm';

	// 本地存储目录
	var dir = './img';

	// 图片链接地址
	var links = [];

	// 创建目录
	mkdirp(dir, function(err) {
	    if(err){
	        console.log(err);
	    }
	});

	// 发送请求
	request(url, function(error, response, body) {
	    if(!error && response.statusCode == 200) {
	        var $ = cheerio.load(body);
	        //console.log(body)
	        $('.has-img a img').each(function() {
	            var src = $(this).attr('src');
	            console.log(src)
	            //src = src//.replace(/t_s208x130c5/, 't_s960x600c5');		//replace  替换字符串
	            links.push(src);	
	        });
	        // 每次只执行一个异步操作
	        async.mapSeries(links, function(item, callback) {
	        	//console.log(links)
	            download(item, dir, Math.floor(Math.random()*100000) + item.substr(-4,4));
	            callback(null, item);
	        }, function(err, results) {});
	    }
	});

	// 下载方法
	var download = function(url, dir, filename){
	    request.head(url, function(err, res, body){
	        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
	    });
	};
//}


