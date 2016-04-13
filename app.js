var express = require('express');
var path = require('path');
var _ = require('lodash');

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')();
var mysql = require('./src/config/database-promise.js');
var using = require('bluebird').using;

app.set('port', process.env.PORT || 6000);
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('src/static/css'));
app.use(express.static('src/static/js'));
app.use(express.static('src/static/lib'));
app.use(express.static('src/views'));

var viewOptions = {
    root: __dirname + '/src/views/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};

app.get('/', (req, res) => {
    res.sendFile('main.html', viewOptions);
});

function getUsers() {
    using(mysql.foo(), (conn) => {
        conn.queryAsync('SELECT * FROM USER')
            .then((data) => {
                console.log('this is the data:');
                console.log(data);
                return 'hello';
            }).then((data) => {
                console.log('inner then' + data);
            });
    });
}

http.listen(3000, 'localhost');
