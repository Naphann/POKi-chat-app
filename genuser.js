#! usr/bin/env Node
var mysql = require('mysql');
var bcrpyt = require('bcrypt-nodejs');
var argv = require('minimist')(process.argv.slice(2));
var clc = require('cli-color');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'pokichat',
    password: 'pokichat',
    database: 'pokichat'
});

if (!(argv.username && argv.password)) {
    console.log(clc.cyanBright('usage : node genuser.js --username=<username> --password=<password>'));
    process.exit();
}

var password = argv.password;
var username = argv.username;

bcrpyt.hash(password, null, null, (err, hash) => {
    
    var opt = {
        username: username,
        password: hash,
        displayname: username
    };
    
    // this is the syntax to escaped character
    var query = connection.query('INSERT INTO USER SET ?', opt, (err, results) => {
        if (err) {
            console.error(clc.red(err));
            process.exit();
        }
        // console.dir(clc.cyanBright(results));
        console.log(clc.green(`user ${username} created`));
        connection.end();  
    });
    console.log(clc.cyanBright(query.sql));
});