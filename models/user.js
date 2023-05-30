const mysql = require('mysql2');

const dbConfig = require('../config/database');

const pool = mysql.createPool(dbConfig);

const User = {};

User.register = (name, email, password, callback) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const values = [name, email, password];

  pool.query(query, values, (error, results) => {
    if (error) {

        // console.log("data not inserted", error)
      return callback(error);
    }
    // console.log("data inserted")
    return callback(null, results.insertId);
    
  });
};

User.login = (email, password, callback) => {
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const values = [email, password];

  pool.query(query, values, (error, results) => {
    if (error) {
      // console.log("login err",error)
      return callback(error);
    }
    // console.log("login suc")
    return callback(null, results[0]);
  });
};

User.getUserById = (userId, callback) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const values = [userId];

  pool.query(query, values, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results[0]);
  });
};

module.exports = User;
