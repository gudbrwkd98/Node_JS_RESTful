    var http = require("http"); //웹 서버 모듈 가져오기 
    var fs = require("fs");
    var mysql = require("mysql"); //mysql 외부 모듈 가져오기 
    var server = http.createServer(function (request,response){
    
     
            
            console.log("클라이언트의 요청 url 은", request.url);
            console.log("클라이언트의 요청 method 는" , request.method);

            //입력양식 폼을 작성하면 
            if(request.url=="/rest/board/form" && request.method=="GET"){
                    fs.readFile("./main.html","utf-8",function(error,data){
                        response.writeHead(200,{"Content-Type" : "text/html;charset=utf-8"});
                        response.end(data); //응답 정보중 body 를 구성한다!!
                    });
            }else if(request.url=="/rest/board" && request.method=="GET"){//목록 요청 처리 

                    //mysql 연동
                   let con = mysql.createConnection({
                        url:"localhost",
                        user:"root",
                        password:"1234",
                        database:"android"
                    });
                    var sql = "select * from board order by board_id desc";
                    con.query(sql,function(error,record,fields){
                        if(error){
                            response.writeHead(500,{"Content-Type":"application/json;charset=utf-8"});
                            response.end("목록 가져오기 error");
                        }else{
                                console.log(record);
                                //가상으로 json data 를 보내보자!!
                                
                                // var arr = [];
                                // var json={};
                                // json["board_id"]=25;
                                // json["title"]="바보";
                                // json["writer"]="데이터";
                                // json["content"]="ㅎㅎㅎㅎㅎㅎㅎ";
                                // json["regdate"]="2021-01-26";
                                // json["hit"]=0;

                                // arr.push(json);//json객체를 배열에 넣자!

                                response.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
                                response.end(JSON.stringify(record)); //String 화 시켜 전송 

                        }
                    });

                   
            }else if(request.url=="/rest/board/{board_id}" && request.method=="GET"){ //상세 내용 
                
            }else if(request.url=="/rest/board" && request.method=="POST"){ //등록  

                    request.on("data",function(param){
                        var json = JSON.parse(param);
                                            //mysql 연동
                   let con = mysql.createConnection({
                    url:"localhost",
                    user:"root",
                    password:"1234",
                    database:"android"
                });
                    var sql = "insert into board(title,writer,content) values(?,?,?)";

                con.query(sql,[json.title,json.writer,json.content],function(error,result,fields){
                    if(error){
                        response.writeHead(500,{"Content-Type":"application/json;charset=utf-8"});
                        response.end("등록 error");
                    }else{
                        response.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
                        response.end("등록 성공"); //String 화 시켜 전송 
                    }
                }) 


                    })

                
            }else if(request.url=="/rest/board" && request.method=="PUT"){ //수정  
                
            }else if(request.url=="/rest/board/{board_id}" && request.method=="DELETE"){ //삭제   
            }

            


            

           

           

            


            


    });

    //접속자 감지
    // server.on("connection",function(){
    //     console.log("클라이언트 요청 감지");
    // });

    server.listen(7777,function(){
        console.log("The Server is running 7777 port....")
    });