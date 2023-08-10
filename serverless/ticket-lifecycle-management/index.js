const aws = require("aws-sdk");
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'r360poc.cjye3hf53icy.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'graymatter',
  port: '3306',
  database: 'r360poc1'
});

exports.handler = (event, context, callback) => {
  console.log(process.env.MySql_HOST);
  console.log(event.Records[0].body);
  const body = JSON.parse(event.Records[0].body);
  console.log(body);

  const {
    Ticket_Role,
    R360_PSD_ID,
    taskToken
  } = body;

  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;

  const sql = `UPDATE PSD SET Ticket_Role="${Ticket_Role}" WHERE R360_PSD_ID = ${R360_PSD_ID}`;

  console.log(sql);
  console.log('---------------------------------');
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query(sql, function (err, result) {
      console.log(result);
      console.log(err);
      const stepfunctions = new aws.StepFunctions();
      const paramsReject = {
        cause: err,
        taskToken: taskToken,
      };

      try {
        const paramsApprove = {
          output: JSON.stringify({
            R360_PSD_ID: R360_PSD_ID,
            status: 'approved',
            escalation: 'false'
          }),
          taskToken: taskToken,
        };

        stepfunctions.sendTaskSuccess(paramsApprove, (err, data) => {
          console.log('sendTaskSuccess');
          if (err) {
            console.log(err);

            const response = {
              statusCode: 500,
              body: JSON.stringify('Error!'),
            };
            return response;
          }
          console.log(data);
          const response = {
            statusCode: 200,
            body: data,
          };
          return response;
        });
      } catch (err) {
        console.log(err);
        stepfunctions.sendTaskFailure(paramsReject, (err, data) => {
          console.log('sendTaskFailure');
          if (err) {
            const response = {
              statusCode: 500,
              body: JSON.stringify('Error!'),
            };
            return response;
          }

          console.log(data);
          const response = {
            statusCode: 200,
            body: data,
          };
          return response;
        });
      }
    });
  });
};