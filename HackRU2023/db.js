const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Srinandan@1025',
    database: 'HackRU2023'

});

db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    // console.log('Connected to the MySQL server.');
  });

module.exports = db;