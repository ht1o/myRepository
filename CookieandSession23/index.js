const fs=require('fs')
const express=require('express')
const app=express()
const port=3000;
const cookieParser=require('cookie-parser');
const session=require('express-session')
const bcrypt=require('bcrypt')
const bodyParser=require('body-parser')
const passport=require('passport')

require('./passport-config')

// const{body,validationResult}=require('express-validator')
//middlewear to parse cookies from the request
app.use(cookieParser())
//middlewear of the session config
app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized:true
}))
// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//init passport on every route call
app.use(passport.initialize())

//allow passport to use express-session
app.use(passport.session())

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

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

app.post('/register',async(req,res)=>{
    try{
        const hashedPassword= await bcrypt.hash(req.body.password,10);
        const newUser={
            id: users.length+1,
            username: req.body.username,
            password: hashedPassword
        }
        users.push(newUser)
        res.redirect('/login')
    }catch(error){
        res.redirect('/register')
    }
})

app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login')
})
// Server Variable Structure

/*app.post('/register',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    if(users.some(user=>user.username===username)){
        res.status(400).json({error:'Username already exists'})
    }else{
        const hashedPassword=bcrypt.hash(password,10);
        users.push({username,password:hashedPassword});
        res.status(201).json({message:'Registered successfully'});
    }
})

app.post('/login', (req, res) => {
 const{username,password}=req.body;
 const user=users.find(u=>u.username===username&&u.password===password);
 if(user){
    req.session.userId=user.id
    res.cookie('sessionId',req.session.id)
    res.status(201).json('Login successfully')
 }else{
    res.status(404).json('Cannot login')
 }

})

const authenticate=(req,res,next)=>{
    if(req.session.userId&&req.cookies.sessionId){
        if(req.session.userId===req.cookies.sessionId){
            next()
        }else{
            res.status(401).json('Invalid session')
        }
    }else{
        res.status(401).json('Invalid session or cookie')
    }
}

app.get('/protected',authenticate,(req,res)=>{
    res.send(`Protected resource for user ${req.session.userId}`);
})

app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
        }else{res.send('Destroyed!')}
    })
    res.clearCookie('sessionId');
    console.log('Session destroyed and cookie cleared')
})*/

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})