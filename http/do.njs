#!/usr/local/bin/node

var json = require('jsonfile')
var querystring = require('querystring')
var param = querystring.parse(process.env.QUERY_STRING)

/*console.log('Content-type: text/html; charset=utf-8\n')
console.log('<h1>Do u want to join my teamXDD</h1>')*/

json.readFile('name.json',function(err,data){
  console.log('Content-type: text/html; charset=utf-8\n')
  console.log("<h1>Welcome back, " + data[param.ID]+"</h1>")
})

