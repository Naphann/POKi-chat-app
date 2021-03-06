var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mysql = require('mysql');
var Promise = require('bluebird');
var using = Promise.using;
var clc = require('cli-color');
var fs = require('fs');
var db = require('./src/config/database-promise');
var bcrypt = require('bcrypt-nodejs');
var argv = require('yargs').argv;
var error = clc.red.bold;
var warn = clc.yellow;
var info = clc.cyanBright;
var success = clc.green;

Promise.promisifyAll(fs);
Promise.promisifyAll(bcrypt);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'pokichat',
    password: 'pokichat',
    database: 'pokichat'
});

var poolBackup = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'pokichat',
    password: 'pokichat',
    database: 'pokichat-backup'
});

function getSqlConnection() {
    return pool.getConnectionAsync().disposer((connection) => {
        connection.release();
    });
}

function getSqlConnectionBackup() {
    return poolBackup.getConnectionAsync().disposer((connection) => {
        connection.release();
    });
}

gulp.task('sass', function () {
    return gulp.src('./src/static/scss/*.scss')
        .pipe($.sass({ outputStyle: 'compressed' }).on('error', $.sass.logError))
        .pipe(gulp.dest('./src/static/css'));
});

gulp.task('sass-watch', function () {
    gulp.watch('./src/static/scss/*.scss', ['sass']);
});

gulp.task('serve', function () {
    $.nodemon({
        script: 'app.js',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development',
            'PORT': (argv.port ? argv.port : 3000),
            'TYPE': (argv.master ? 'master' : 'slave')
        }
    });
});

gulp.task('create-database', function () {
    bar();
    console.log(info('creating database ...'));
    var sql = fs.readFileSync('db.sql').toString().split('--');
    sql.push('end');
    using(getSqlConnection(), function (conn) {
        Promise.each(sql, function (query) {
            if (query === 'end') {
                pool.end();
                console.log(success('database created'));
                bar();
                return;
            }
            return conn.queryAsync(query)
                .then(function (msg) {
                    // console.dir(msg);
                    console.log(info(`table ${query.split('(')[0].split(' ')[2]} created`));
                });
        }).catch(function (err) {
            console.error(error(err));
            pool.end();
        });
    }).catch(function (err) {
        console.log(error('wtf something went wrong.'));
    });
});


gulp.task('test-database-connection', function () {
    console.log(info('testing connection ...'));
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'pokichat',
        password: 'pokichat',
        database: 'pokichat'
    });
    connection.connect(function (err) {
        if (err) {
            console.error(error('error connecting: ' + err.stack));
            return;
        }
        bar();
        console.log(success('connection success'));
        console.log(success('connected as id ' + connection.threadId));
        bar();
        connection.end();
    });
});

gulp.task('clean-database', function () {
    console.log(info('cleaning database ...'));
});

gulp.task('seed-database', function () {
    bar();
    console.log(info('seeding database ...'));
    var buffer = fs.readFileSync('seeder.json', 'utf8');
    var sql = JSON.parse(buffer);

    var createUserPromise = function (user) {
        return bcrypt.hashAsync(user.password, null, null)
            .then((hash) => {
                return db.createUser(user.username, user.displayname, hash);
            })
    };

    var createRoomPromise = function (room) {
        return db.createRoom(room.roomname);
    }

    var createUserRoomPromise = function (userRoom) {
        return db.subscribeRoom(userRoom.user_id, userRoom.room_id);
    }

    var createMessagePromise = function (msg) {
        return db.createMessage(msg.room_id, msg.sender_id, msg.content);
    }
    
    var results = Promise.all(sql.users.map(createUserPromise))
        .then(() => {
            return Promise.all(sql.rooms.map(createRoomPromise));
        })
        .then(() => {
            console.log(info('rooms created'));
            return Promise.all(sql.messages.map(createMessagePromise));
        })
        .then(() => {
            console.log(info('messages created'));
            return Promise.all(sql.user_room_without_last_id.map(createUserRoomPromise));
        })
        .then(() => {
            console.log(info('user_room created'));
            console.log(success('done seeding database ...'));
            bar();
            process.exit(0);
        });
});

function bar() {
    console.log(warn('============================================='));
}
