var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'wp2016_groupI',
  password: 'idea',
  database: 'wp2016_groupI'
});
connection.connect();

var id = 'E94021115';

var query = connection.query('select * from membership', function(err, result){
  if(err){
    console.error(err);
    return;
  }
  console.log(result);
});

connection.end();
