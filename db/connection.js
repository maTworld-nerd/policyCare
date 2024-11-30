const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionLimit: 10, 
  database: process.env.DB_NAME
});

// testing the connection
pool.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL database.");
  });



module.exports = pool.promise();
