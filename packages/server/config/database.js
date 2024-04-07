// const mysql = require('mysql');

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword",
//   database: "mydb"
// });

// const connectToDatabase = () => {
//   con.connect((err) => {
//     if (err) {
//       setTimeout(connectToDatabase, 2000); // try to reconnect every 2 seconds
//     } else {
//       // console.log("Connected to database!");
//     }
//   });

//   con.on('error', (err) => {
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') {
//       connectToDatabase();
//     } else {
//       throw err;
//     }
//   });
// }

// connectToDatabase();
