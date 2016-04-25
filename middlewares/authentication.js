module.exports = function(passport, LocalStrategy, Promise, using, pool, bcrypt) {
    function init() {
        passport.serializeUser(function(user, done) {
    		done(null, user.user_id);
        });

        passport.deserializeUser(function(id, done) {
            using(pool.getSqlConnection(), (conn) => {
                conn.queryAsync("SELECT * FROM user WHERE user_id=?",[id])
                .then(function (results) {
                    return Promise.map(results, (user, idx) => {
                        user.index = idx+1;
                        return user;
                    });
                })
                .then((users) => {
                    done(null, users[0]);
                });
            });
        });

        passport.use('local', new LocalStrategy({
                username : 'username',
                password : 'password'
            },
            (username, password, done) => {
                var data = false;
                pool.getUser(username)
                    .then((results) => {
                        var user = results[0];
                        return user;
                    })
                    .then(user => {
                        if(bcrypt.compareSync(password, user.password)) {
                            delete user.password;
                            data = true;
                        }
                        return done(null, user, true);
                    })
                    .catch((err) => {
                        return done(null, false, false);
                    })
                // using(pool.getSqlConnection(), (conn) => {
                //     conn.queryAsync("SELECT user_id, displayname, password FROM user WHERE username=?",[username])
                //     .then(function (results) {
                //         return Promise.map(results, (user, idx) => {
                //             user.index = idx+1;
                //             return user;
                //         });
                //     })
                //     .then((users) => {
                //         if(users.length == 1) {
                //             if(bcrypt.compareSync(password, users[0].password)) {
                //                 delete users[0].password;
                //                 data = true;
                //             }
                //         }
                //         if(users[0])
                //             return done(null, users[0], data);
                //         else
                //             return done(null, false, data);
                //     });
                // });
            }
        ));
    }

    function authenticate(req, res, next) {
        passport.authenticate('local', (error, user, info) => {
            if(error) return next(error);
            if(!user) return res.send(info);
            req.login(user, function(err) {
              if (err) { return next(err); }
              console.log(req.user);
              return res.send(info);
            });
        })(req, res, next);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated());
    }

    function checkLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send(false);
        }
    }

    return { init: init, authenticate: authenticate, loggedIn: loggedIn, checkLoggedIn: checkLoggedIn};
}
