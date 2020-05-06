const http=require('http');
const fs=require('fs');
var qs=require('querystring');
var wp='';
var jsFile='';
var cssFile='';
http.createServer((req,res)=>{
    switch(req.url){
case'/':
res.writeHead(200,{'Content-Type':'text/html'});
file=fs.readFileSync('./appdata/MainPage.html');
res.end(file);
break;
    }
}).listen(3000,()=>console.log('Server is working'));
const sql = require('mssql')
 
var config = {
  server: 'DESKTOP-H3854OI\SQLEXPRESS',
  database: 'BD.ALCOSHOP',
  user: 'user',
  password: '1111',
  port: 1433
};
function load() {
  //4.
  var dbConn = new sql.ConnectionPool(config);
  //5.
  dbConn.connect().then(function () {
      //6.
      var request = new sql.Request(dbConn);
      //7.
      request.query("select * from ASSORTMENT").then(function (recordSet) {
          console.log(recordSet);
          dbConn.close();
      }).catch(function (err) {
          //8.
          console.log(err);
          dbConn.close();
      });
  }).catch(function (err) {
      //9.
      console.log(err);
  });
}
load();