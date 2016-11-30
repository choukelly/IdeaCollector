#!/usr/local/bin/node

(function() {
var http = require('http');
var url = require('url');
var qs = require('querystring');
var param = qs.parse(process.env.QUERY_STRING)

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'wp2016_groupI',
    password: 'idea',
    database: 'wp2016_groupI'
});

connection.connect();

server = http.createServer(function(req, res) {
    var urlData = url.parse(req.url, true);
    var action = urlData.pathname;
    res.writeHead(200,{
        "Content-Type":"text/html"
    });
    if(action === "/add"){
        formData = '';
        req.on('data', function(data){
            return formData += data;
        });
    return req.on('end', function(){
        var idea = qs.parse(formData);
        res.writeHead(200,{
            "Content-Type":"text/html"
        });
    return res.end(idea.ideaname + idea.comment);
    });
    }else{
        return res.end("<h1>來吧！</h1>");
    }
    });

var query = connection.query('insert into ideaPool (ideaname, comment) values set ?', [param.ideaname, param.comment], function(error,rows,fields){
  if(error){
      console.error(error);
      return;
  }
  console.log('Content-type: text/html; charset=utf-8\n')
  console.log("<h1>Insert " + rows[0]+" successful</h1>")
});

connection.end();
    server.listen(3000);
    }).call(this);
