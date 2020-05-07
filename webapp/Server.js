const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const sql = require("mssql/msnodesqlv8");

const conn = new sql.ConnectionPool({
  server: 'DESKTOP-H3854OI\\SQLEXPRESS',
  database: 'BD.ALCOSHOP',
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
});

app.set("view engine", "hbs");

app.get("/", function(req, res){
  res.render("Form.hbs");
});

app.post("/", urlencodedParser, function(req, res){
  if(!req.body) return res.sendStatus(400);
  res.redirect("/MainPage.hbs");
});

app.get("/MainPage.hbs", function (req, res) {
  conn.connect().then(function () {
    var request = new sql.Request(conn);
    request.query("select * from ASSORTMENT").then(function (recordSet) {
          res.render("MainPage.hbs", {
          items: recordSet
          
      }).catch(function (err) {
          
        console.log(err);
        
    });
      
      conn.close();
    }).catch(function (err) {
      
      console.log(err);
  });
});
});

app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
});