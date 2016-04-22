var Promise = require('bluebird');
var mysql = require('mysql');
var moment = require('moment');
var using = Promise.using;

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
    insertSql('user', userObj).then((data) => {
        console.log('finish');
        console.log(`this is the insert id ${data}`);
    }).catch((err) => {
        console.log(`error: ${err}`);
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

function joinRoom() {
    
}

module.exports.getSqlConnection = getSqlConnection;
module.exports.createUser = createUser;
module.exports.rawSql = rawSql;
