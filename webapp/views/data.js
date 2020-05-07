var express = require('express');
var app = express();
const sql = require("mssql/msnodesqlv8");
const conn = new sql.ConnectionPool({
  server: 'DESKTOP-H3854OI\\SQLEXPRESS',
  database: 'BD.ALCOSHOP',
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
});

  conn.connect().then(function () {
    app.get('/MainPage.html', function (req, res) {
      var request = new sql.Request(conn);
      
      request.query("select * from ASSORTMENT").then(function (recordSet) {
          console.log(recordSet);
          conn.close();
      }).catch(function (err) {
          
          console.log(err);
          conn.close();
      });
  }).catch(function (err) {
      
      console.log(err);
  });
});
