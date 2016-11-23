#!/usr/local/bin/node

var json = require('jsonfile')
var querystring = require('querystring')
var param = querystring.parse(process.env.QUERY_STRING)

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'wp2016_groupI',
    password: 'idea',
    database: 'wp2016_groupI'
});

connection.connect();

var query = connection.query('insert into ideaPool (ideaname, comment) values set ?', [param.ideaname, param.comment], function(error,rows,fields){
  if(error){
      console.error(error);
      return;
  }
  console.log('Content-type: text/html; charset=utf-8\n')
  console.log("<h1>Insert " + rows[0]+" successful</h1>")
});

connection.end();
