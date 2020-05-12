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
  res.render("LogIn.hbs");
});

app.post("/", urlencodedParser, function(req, res){
  const user =req.body;
  conn.connect().then(function () {
    var request = new sql.Request(conn);    
    
    var login=user.login
    
    var pass=user.pass
    console.log(`SELECT * FROM Logs WHERE userName='${login}' AND password='${pass}';`);
    
  request.query(`SELECT * FROM Logs WHERE userName='${login}' AND password='${pass}';`).then (function (result) {
    console.log(result.recordset);
    if(result.recordset.length=1){
      res.redirect("/MainPage.hbs");
    }
    conn.close();

 // res.redirect("/MainPage.hbs");


}).catch(function (err) {
          
  console.log('запрос умер');
  conn.close();
});
}).catch(function (err) {
          
  console.log(err);
  conn.close();
});

});

app.get("/registr", function(req, res){
  res.render("RegistrationPage.hbs");
});

app.post("/registr", urlencodedParser, function(req, res){
  const user =req.body;
  conn.connect().then(function () {
    var request = new sql.Request(conn);    
    
    var login=user.login
    var email = user.email
    var pass=user.pass
    console.log(`INSERT INTO Logs (userName, email, password) VALUES ('${login}','${email}','${pass}');`);
    
  request.query(`INSERT INTO Logs (userName, email, password) VALUES ('${login}','${email}','${pass}');`).then (function (result) {
    console.log(result);
    if(result.rowsAffected=1){
      res.redirect("/MainPage.hbs");
    }
    conn.close();

  


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

