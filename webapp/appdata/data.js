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