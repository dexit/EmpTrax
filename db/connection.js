const mysql = require('mysql2');

// Create a connection pool for the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '5956272!Kk',
  database: 'employee_tracker',
  waitForConnections: true,
  connectionLimit: 10,
});

// Export the pool to be used in other files
module.exports = {
  connection: pool.promise(),
};