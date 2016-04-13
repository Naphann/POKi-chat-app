var bcrypt = require('bcrypt-nodejs');

bcrypt.hash('password', null, null, (err, hash) => {
    console.log(`hash length is ${hash.length}`);
    console.log(hash);
});