var express = require('express');
var path = require('path');
var _ = require('lodash');

var app = express();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var clientIO = require('socket.io-client');
var mysql = require('mysql');
var db = require('./src/config/database-promise.js');
var using = require('bluebird').using;
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set('port', process.env.PORT);
app.set('type', process.env.TYPE); // SERVER type master/slave
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 2592000000 }, resave: true, saveUninitialized: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('src/static/css'));
app.use(express.static('src/static/js'));
app.use(express.static('src/static/lib'));
app.use(express.static('src/views'));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Middlewares
var POKiAuth = require('./middlewares/authentication.js')(passport, LocalStrategy, Promise, using, db, bcrypt);

app.get('/', (req, res) => {
    db.rawSql('SELECT * FROM USER WHERE user_id < ? and user_id > ?', [4, 2])
        .map((user, idx) => {
            user.index = idx + 1;
            return user;
        })
        .then((users) => {
            var data = { users: users };
            console.log(data);
            res.render('main', data);
        });
});

app.get('/test', (req, res) => {
    res.end(`<h1>hello world</h1>`);
});

// app.post('/login', (req,res) => {
//     console.log(req.body.user,"try to login.");
//     res.send(req.body);
// });

app.get('/foo', (req, res) => {
    db.rawSql('SELECT * FROM room WHERE room_id NOT IN (SELECT room_id FROM user_room WHERE user_id = ?)', ['1'])
        .then(results => {
            console.log(results);
            res.end('foo');
        })

})

app.get('/bar', (req, res) => {
    db.rawSql('SELECT * FROM room INNER JOIN user_room ON room.room_id = user_room.room_id WHERE user_id = ?', ['1'])
        .then(results => {
            console.log(results);
            res.end('foo');
        })

})

POKiAuth.init(passport, LocalStrategy);
app.post('/login', POKiAuth.authenticate);
app.get ('/login/check', POKiAuth.loggedIn);
app.post('/login/getUser', POKiAuth.checkLoggedIn,
    (req,res) => {
        res.send({
            id: req.user.user_id,
            username: req.user.username,
            display: req.user.displayname,
        });
    }
);
app.get('/logout', (req,res) => {
    req.logout();
    res.send('Logged out.');
});


// to sync data between servers
if (app.get('type') === 'master') {
    var client = clientIO.connect('http://localhost:3001', { reconnect: true });
} else {
    var client = clientIO.connect('http://localhost:3000', { reconnect: true });
}

io.on('connection', function (socket) {
    console.log('there is a connection');
    socket.emit('test', { x: ['hello world', 'foo', 'bar'] });
    socket.on('test', (data) => {
        console.log('get this:' + data);
    })

    socket.on('ack', function () {
        socket.emit(app.get('type'));
    });

    socket.on('message', (msg) => {
        console.log(`receive message: '${msg.content}' to room: '${msg.roomId}' by '${msg.senderId}'`);
        db.createMessage(msg.roomId, msg.senderId, msg.content)
            .then(() => {
                io.to(msg.room).emit('message', msg);
                // to get notification when new message comes
                // *** only if you are at main page ***
                io.to('main room').emit('message', {
                    roomId: '-1'
                });
            });
        // pass data to backup
        client.emit('message', msg);
    });

    socket.on('create room', (data) => {
        db.createRoom(data.roomname)
            .then(() => {
                socket.emit('create room', {
                    success: true
                });
            })
            .catch(() => {
                socket.emit('create room', {
                    success: false
                });
            });
        // pass data to backup
        client.emit('create room', data);
    });

    socket.on('join room', (data) => {
        console.log('join event fired');
        socket.leave(data.oldRoom);
        socket.join(data.room);
    });

    socket.on('leave room', (data) => {
        console.log('leave room');
        socket.leave(data.room);
    });

    socket.on('subscribe room', (data) => {
        console.log('subscribe room in db');
        db.subscribeRoom(data.userId, data.roomId);
        // pass data to backup
        client.emit('subscribe room', data);
    });

    socket.on('unsubscribe room', (data) => {
        console.log('exit room');
        db.unsubscribeRoom(data.userId, data.roomId);
        // pass data to backup
        client.emit('unsubscribe room', data);
    });

    socket.on('read', (data) => {
        db.readMessage(data.userId, data.roomId, data.messageId);
        // pass data to backup
        client.emit('read', data);
    });

    socket.on('all-room', (data) => {
        db.getAllRoom(data.userId).then(results => {
            socket.emit('all-room', results);
        });
    });

    socket.on('joined-room', (data) => {
        console.log("this is serve");
        console.log(data);
        db.getJoinedRoom(data.userId).then(results => {
            socket.emit('joined-room', results);
        });
    });

    socket.on('get unread', (data) => {
        db.getNewMessage(data.userId, data.roomId)
            .then(results => {
                socket.emit('get unread', results);
            });
    })
});



http.listen(app.get('port'));
console.log(`${app.get('type')} happens at port ${app.get('port')}`);
