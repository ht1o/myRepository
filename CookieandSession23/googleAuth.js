const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const users = [
    {
        id:1,
      username: 'alice',
      password: 'hashed_password',
    },
    {
        id:2,
        username: 'Hicham',
        password: 'HiMinho01234'
    },
    {
        id:3,
        username: 'bad',
        password: 'bad1996_account'
    }
  ];

passport.use(new GoogleStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-client-secret',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId : profile.id}, (err,user)=>{
        return done(err,user)
    })
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user=users.find(u=>u.id===id)
    done(null,user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['username','profile'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        // Access user data using req.user
        res.send(`Welcome, ${req.user.username}!`);
    } else {
        res.redirect('/login');
    }
});

app.post('/login',passport.authenticate('google',{
  successRedirect: '/profile',
  failureRedirect:'/login'
})


)

app.listen(3000,()=>{
    console.log('Server is running on 3000')
})