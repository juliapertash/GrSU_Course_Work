var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "1111",
  insecureAuth : true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});