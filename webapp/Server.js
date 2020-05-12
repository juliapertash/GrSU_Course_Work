const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
const sql = require("mssql/msnodesqlv8");

const urlencodedParser = bodyParser.urlencoded({extended: false});

const conn = new sql.ConnectionPool({
  server: 'DESKTOP-H3854OI\\SQLEXPRESS',
  database: 'AlcoWebSite',
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
  const user =req.body;
  conn.connect().then(function () {
    var request = new sql.Request(conn);    
    console.log(user.login +" "+user.date);
    //'INSERT INTO Logs (userName, Time) VALUES ($1, $2);', [user.login, user.date]
  request.query('select * from Logs').then (function (result) {
    console.log(result);
    conn.close();

  res.redirect("/MainPage.hbs");


}).catch(function (err) {
          
  console.log('запрос умер');
  conn.close();
});
}).catch(function (err) {
          
  console.log(err);
  conn.close();
});

});

app.get("/MainPage.hbs", function (req, res) {
  res.render("MainPage.hbs");
});


app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
});

