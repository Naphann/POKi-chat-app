var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')();

app.get('/', (req, res) => {
    console.log('hello');
    res.end('<h1>hello world</h1>');
});

http.listen(3000, 'localhost');
