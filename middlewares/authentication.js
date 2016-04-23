module.exports = function(passport, LocalStrategy, Promise, using, pool, bcrypt) {
    function init() {
        passport.serializeUser(function(user, done) {
    		done(null, user.user_id);
        });

        passport.deserializeUser(function(id, done) {
            using(pool.getSqlConnection(), (conn) => {
                conn.queryAsync("SELECT * FROM user WHERE user_id='" + id + "'")
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
                var data;
                using(pool.getSqlConnection(), (conn) => {
                    conn.queryAsync("SELECT user_id, displayname, password FROM user WHERE username='" + username + "'")
                    .then(function (results) {
                        return Promise.map(results, (user, idx) => {
                            user.index = idx+1;
                            return user;
                        });
                    })
                    .then((users) => {
                        if(users.length == 1) {
                            if(bcrypt.compareSync(password, users[0].password)) {
                                delete users[0].password;
                                data = { msg: "Login success.", user: users[0] };
                            }
                            else data = { msg: "Invalid username or password."};
                        }
                        else data = { msg: "Invalid username or password."};
                        if(data.user)
                            return done(null, data.user, data);
                        else
                            return done(null, false, data);
                    });
                });
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

    function loggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            res.send("You are logged in.");
        } else {
            res.send("You aren't logged in.");
        }
    }

    return { init: init, authenticate: authenticate, loggedIn: loggedIn};
}
