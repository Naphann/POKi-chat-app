var Promise = require('bluebird');
var mysql = require('mysql');
var using = Promise.using;

var clc = require('cli-color');
var error = clc.red.bold;
var warn = clc.yellow;
var info = clc.cyanBright;
var success = clc.green;

Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'pokichat',
    password: 'pokichat',
    database: 'pokichat'
});

function getSqlConnection() {
    return pool.getConnectionAsync().disposer((connection) => {
        connection.release();
    });
}

function rawSql(sql, obj) {
    return using(getSqlConnection(), (conn) => {
        return conn.queryAsync(sql, obj);
    });
}

function insertSql(tablename, obj) {
    return rawSql(`INSERT INTO ${tablename} SET ?`, obj)
        .then((results) => {
            return results.insertId;
        })
        .catch((err) => {
            throw -1;
        });
}

function createUser(username, displayname, password) {
    var userObj = {
        'username': username,
        'displayname': displayname,
        'password': password
    };
    return insertSql('user', userObj)
        .then((data) => {
            console.log(info(`user ${username} created with user_id = ${data}`));
            // console.log(info(`this is the insert id ${data}`));
        }).catch((err) => {
            console.error(`error: ${err}`);
        })
}

function createRoom(roomname) {
    var roomObj = { 'roomname': roomname };
    rawSql('INSERT INTO room SET ?', roomObj)
        .then((results) => {
            return results.insertId;
        })
        .catch((err) => {
            return -1;
        });
}

function createMessage(roomId, senderId, content) {
    var msgObj = {
        room_id: roomId,
        sender_id: senderId,
        content: content,
    };
    rawSql('INSERT INTO message SET ?', msgObj)
        .then((results) => {
            return results.insertId;
        })
        .catch((err) => {
            return -1;
        });
}

function subscribeRoom(userId, roomId) {
    var obj = {
        user_id: userId,
        room_id: roomId
    };
    return rawSql('SELECT message_id FROM message WHERE room_id = ? ORDER BY message_id DESC LIMIT 1', [roomId])
        .then((results) => {
            // console.log(results);
            obj.last_message_id = results[0].message_id;
            return insertSql('user_room', obj);           
        });
}

module.exports = {
    getSqlConnection: getSqlConnection,
    createMessage: createMessage,
    createRoom: createRoom,
    createUser: createUser,
    rawSql: rawSql,
    pool: pool,
    subscribeRoom: subscribeRoom
};