module.exports = function(passport, LocalStrategy, Promise, using, db, bcrypt, client) {
    function init() {
        passport.serializeUser(function(user, done) {
    		done(null, user.user_id);
        });

        passport.deserializeUser(function(id, done) {
            using(db.getSqlConnection(), (conn) => {
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
                db.getUser(username)
                    .then((results) => {
                        var user = results[0];
                        return user;
                    })
                    .then(user => {
                        return done(null, user, bcrypt.compareSync(password, user.password));
                    })
                    .catch((err) => {
                        console.log(err);
                        return done(null, false, false);
                    })
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

    function signup(req, res, next) {
        var username = req.body.username;
        var displayname = req.body.displayname;
        var hash = bcrypt.hashSync(req.body.password)
        client.emit('create user', {username: username, displayname: displayname, hash: hash});
        db.createUser(username, displayname, hash)
            .then(()=>{ next(); })
            .catch(() => {
                res.send(false);
            });
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

    return { init: init, authenticate: authenticate, loggedIn: loggedIn, checkLoggedIn: checkLoggedIn, signup: signup};
}
