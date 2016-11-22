var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'wp2016_groupI',
  password: 'idea',
  database: 'wp2016_groupI'
});
connection.connect();

var classmate ={
  student: 'Chou Kelly',
  major: 'Engineering Science'
};

var query = connection.query('insert into membership set ?', classmate, function(err, result){
  if(err){
    console.error(err);
    return;
  }
  console.error(result);
});
