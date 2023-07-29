const mysql = require('mysql');
const con = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE
  });
  
exports.handler = (event, context, callback) => {
    console.log(event);
    // allows for using callbacks as finish/error-handlers
    context.callbackWaitsForEmptyEventLoop = false;
    const R360_PSD_ID = event.R360_PSD_ID;
    const taskToken = event.taskToken;
    
    const sql = `UPDATE PSD SET Workflow_Token="${taskToken}" WHERE R360_PSD_ID = ${R360_PSD_ID}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      callback(null, result)
    });
  };