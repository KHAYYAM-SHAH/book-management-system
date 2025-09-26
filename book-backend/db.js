/*const mysql = require ('mysql2');

const db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'BookApp@123',
    database: 'book_db'
});

db.connect((err) =>{
    if(err) throw err;
    console.log('mysql connected....');
});
module.exports=db;*/


// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BookApp@123',
  database: 'book_manager',
  port: 3306 // default MySQL port
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL.');
});

module.exports = connection;
