//웹서버를 구축하여 이미지를 다운로드 해갈수 있도록 제공..
var http = require("http");
var static = require("serve-static"); //정적 자원 요청 전담 처리 

//일일이 파일을 읽지않고 모듈을 사용하여 읽기 위해 express 모듈을 사용한다 


var express = require("express");

var app = express(); //익스프레스 객체 생성
//미들웨어를 사용할떄는 use() 메서드를 쓴다 
console.log();//현재 실행중인 파일의 물리적 경로 전환 
//static(정적 자원의 위치) 를 넣으면 알아서 파일을 읽어드린다 
app.use(static(__dirname+"/static")); //사용하고픈 미들웨어명 



// var server = http.createServer(function(request,response){
//     //응답할때는 http 형식 
//     response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
//     response.end("ha ha ha");
// });

var server = http.createServer(app); //express 서버로 가동!!

server.listen(7777,function(){
    console.log("Server is running at 7777 port...");
});