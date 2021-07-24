var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('mydb.sqlite3');
const flash = require('connect-flash');


passport.use(new LocalStrategy(
  (username, password, done) => {

    db.all('select * from account', (err, rows) => {
      // usernameもpasswordもユニーク前提
      var usernames = [];
      var passwords = [];

      for (i = 0; i < rows.length; i++) {
        usernames.push(rows[i].username);
        // input(type="password")で渡される値はstringのようなので、
        // データベースから取り出した値もstringにしています。
        passwords.push(rows[i].password.toString());
      }

      if(usernames.includes(username) && passwords.includes(password)) {
        // Success
        return done(null, { username: username, password: password});
  
      } else if (!usernames.includes(username)) {
        // Error
        return done(null, false, { message : 'User does not exist' });
      } else {
        return done(null, false, { message : 'Password incorrect' });
      }

    })


  }
));
    


passport.serializeUser((user, done) => {
  console.log('Serialize ...');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('Deserialize ...');
  done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

router.get('/', (req, res) => {
  console.log(req.session);
  res.render('login', {message: req.flash('error'), user: req.user});
});

router.post('/',
  passport.authenticate('local',
    {
      failureRedirect : 'login/failure',
      failureFlash: true,
      successRedirect : 'login/success'
    }
  )
);

router.get('/failure', (req, res) => {
  console.log(req.session);
  res.render('login',  {message: req.flash('error'), user: req.user});
});

router.get('/success', (req, res) => {
  console.log(req.session);
  res.redirect('/')
});


module.exports = router;