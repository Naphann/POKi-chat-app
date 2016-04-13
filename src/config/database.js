var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'pokichat',
    password: 'pokichat',
    database: 'pokichat'
});

//example usage with normal callbacks
connection.query('SELECT * FROM USER', function (err, rows, fields) {
    console.log('query with callback');
    console.log('=============================================\nrows');
    console.log(rows);
    connection.end();
});
