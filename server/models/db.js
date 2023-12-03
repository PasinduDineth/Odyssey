const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'odyssey',
    port: 3306
  });
    connection.on('connect', () => {
        console.log('Connected to the database!');
    });
    connection.on('error', (err) => {
    console.error('Database connection error:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connection.connect();
    } else {
      throw err;
    }
  });
  
  module.exports = connection;