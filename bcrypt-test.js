var bcrypt = require('bcrypt-nodejs');

bcrypt.compare('poki', '$2a$10$R1inoiZrO/g6B3IbwmY7ROK7UBN34sO4n/b4xg3dWYt2Vfcsg.jvm', function(err, results) {
    if (err) {
        console.error(err);
    } else {
        console.log(results);
    }
});