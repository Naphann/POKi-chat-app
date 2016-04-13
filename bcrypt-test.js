var bcrypt = require('bcrypt-nodejs');

bcrypt.compare('paul', '$2a$10$FlqBp1ZEmDJVZb4gkYd9ruzR7DohcRxkBPcFuq9MMtuf17swDCYSC', function(err, results) {
    if (err) {
        console.error(err);
    } else {
        console.log(results);
    }
});