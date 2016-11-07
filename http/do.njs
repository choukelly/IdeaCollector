#!/usr/local/bin/node

var json = require('jsonfile')
var querystring = require('querystring')
var param = querystring.parse(process.env.QUERY_STRING)

/*console.log('Content-type: text/html; charset=utf-8\n')
console.log('<h1>Hello World!</h1>')*/

json.readFile('name.json',function(err,data){
  console.log('Content-type: text/html; charset=utf-8\n')
  console.log("<h1>hello, " + data[param.ID]+"</h1>")
})
