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

connection.query('SELECT name as name from membership where ID = "F24021080"',function(error,rows,fields){
  if(error){
      throw error;
  }
  console.log('Content-type: text/html; charset=utf-8\n')
  console.log("<h1>Welcome back, " + rows[0].name+"</h1>")
});

connection.end();


/*json.readFile('name.json',function(err,data){
  console.log('Content-type: text/html; charset=utf-8\n')
  console.log("<h1>Welcome back, " + data[param.ID]+"</h1>")
})*/

/*var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'wp2016_groupI',
    password: 'idea',
    database: 'wp2016_groupI'
});

connection.connect();

connection.query('SELECT ID AS id from membership',funct
  if(error){
      throw error;
  }
  console.log(rows[0].id);
});*/



