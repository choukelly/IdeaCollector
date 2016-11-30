#!/usr/local/bin/node

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

connection.query('delete from ideaPool where id = ?', [param.id], function(err, result){
  if(err){
    console.error(err);
    return;
  }
  console.error(result);
});

connection.end();
console.log('Content-type: text/html; charset=utf-8\n');
