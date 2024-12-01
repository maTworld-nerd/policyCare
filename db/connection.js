const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionLimit: 10,
  database: process.env.DB_NAME
});

// Testing the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
  connection.release(); // Release the connection back to the pool
});

// Export the promise-based pool for async/await usage
module.exports = pool.promise();
