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
const sql = require("mssql/msnodesqlv8");
const conn = new sql.ConnectionPool({
  server: 'DESKTOP-H3854OI\SQLEXPRESS',
  database: 'BD.ALCOSHOP',
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
});
function load() {
  //4.
   //5.
  conn.connect().then(function () {
      //6.
      var request = new sql.Request(conn);
      //7.
      request.query("select * from ASSORTMENT").then(function (recordSet) {
          console.log(recordSet);
          conn.close();
      }).catch(function (err) {
          //8.
          console.log(err);
          conn.close();
      });
  }).catch(function (err) {
      //9.
      console.log(err);
  });
}
load();