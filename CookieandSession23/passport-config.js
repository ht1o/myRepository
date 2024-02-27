const passport=require('passport')
const bcrypt=require('bcrypt')
const localStrategy=require('passport-local').Strategy


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

passport.use(new localStrategy((username,password,done)=>{
    const user=users.find(u=>u.username===username);
    if(!user) return done(null,false,{message:'Incorrect user'})

    bcrypt.compare(user.password , password , (err,result)=>{
        if(err) throw err;
        if(result){
            done(null,user)
        }else{
            done(null,false, {message:'Incorrect password !'})
        }
    })

}));

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    const user=users.find(u=>u.id===id)
        done(null,user)
})

