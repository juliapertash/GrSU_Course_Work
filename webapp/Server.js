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

app.use("/show1", function (req, res) {
  conn.connect().then(function () {
    var outputtext="";
    var request = new sql.Request(conn);  
        console.log(`SELECT * FROM Drinks WHERE idCategory=1;`);
      request.query(`SELECT * FROM Drinks WHERE idCategory=1;`).then (function (result) {
        result.recordset.forEach(function(entry) {
         // console.log(entry.Name+" "+entry.Content);
          outputtext+="\n\t"+entry.Name+" - "+entry.Content+" градусов. "+"\n\t";
      });
      console.log(outputtext);

      res.render("showcat.hbs", {
        title: 'Слабоалкогольные напитки',
        content: outputtext
    });

   }).catch(function (err) {
          
  console.log('запрос умер');
  conn.close();
});
}).catch(function (err) {
          
  console.log(err);
  conn.close();
});
  
});

app.use("/show2", function (req, res) {
  conn.connect().then(function () {
    var outputtext="";
    var request = new sql.Request(conn);  
        console.log(`SELECT * FROM Drinks WHERE idCategory=2;`);
      request.query(`SELECT * FROM Drinks WHERE idCategory=2;`).then (function (result) {
        result.recordset.forEach(function(entry) {
         // console.log(entry.Name+" "+entry.Content);
          outputtext+="\n\t"+entry.Name+" - "+entry.Content+" градусов. "+"\n\t";
      });
      console.log(outputtext);

      res.render("showcat.hbs", {
        title: 'Среднеалкогольные напитки',
        content: outputtext
    });

   }).catch(function (err) {
          
  console.log('запрос умер');
  conn.close();
});
}).catch(function (err) {
          
  console.log(err);
  conn.close();
});
  
});

app.use("/show3", function (req, res) {
  conn.connect().then(function () {
    var outputtext="";
    var request = new sql.Request(conn);  
        console.log(`SELECT * FROM Drinks WHERE idCategory=3;`);
      request.query(`SELECT * FROM Drinks WHERE idCategory=3;`).then (function (result) {
        result.recordset.forEach(function(entry) {
         // console.log(entry.Name+" "+entry.Content);
          outputtext+="\n\t"+entry.Name+" - "+entry.Content+" градусов. "+"\n\t";
      });
      console.log(outputtext);

      res.render("showcat.hbs", {
        title: 'Крепкие напитки',
        content: outputtext
    });

   }).catch(function (err) {
          
  console.log('запрос умер');
  conn.close();
});
}).catch(function (err) {
          
  console.log(err);
  conn.close();
});
  
});


app.use("/show4", function (req, res) {
  conn.connect().then(function () {
    var outputtext="";
    var request = new sql.Request(conn);  
        
      request.query(`select Coctails.Name AS coctail, Drinks.Name AS engr, DrinkToCoctail.Quantity AS Quantity
      from DrinkToCoctail join Drinks 
      on DrinkToCoctail.idDrink=Drinks.id
      join Coctails
      on DrinkToCoctail.idCoctail=Coctails.id
      
      UNION
      
      select Coctails.Name, AddIngredients.Name, AddToCoctails.Quantity AS Quantity
      from AddToCoctails join AddIngredients
      on AddToCoctails.idIngred=AddIngredients.id
      join Coctails
      on AddToCoctails.idCoctail=Coctails.id
      
      ORDER BY Coctails.Name
      
      
      `).then (function (result) {
        result.recordset.forEach(function(entry) {
          // console.log(entry.Name+" "+entry.Content);
           outputtext+="\n\t"+entry.coctail+" - "+entry.engr+" - "+entry.Quantity+". "+"\n\t";
       });
        console.log(outputtext);
      
      

      res.render("showcat.hbs", {
        title: 'Коктейли',
        content: outputtext
    });

   }).catch(function (err) {
          
  console.log('запрос умер');
  conn.close();
});
}).catch(function (err) {
          
  console.log(err);
  conn.close();
});
  
});


app.get("/MainPage.hbs", function(req, res){
  res.render("MainPage.hbs");
});
app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
});

