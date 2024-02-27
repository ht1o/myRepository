const jwt = require('jsonwebtoken');
require('dotenv').config();
const{getAllBlogs , createBlog , modifyBlog ,deleteBlog, getAllusers ,createUser}=require("../models/post");
exports.allBlogs = (req,res,next)=>{
    const blogs=getAllBlogs();
    res.send(`these are the posts : ${blogs}`)
} 

exports.allUsers= (req,res)=>{
    const users=getAllusers();
    res.send(`These are the users : ${users}`)
}

exports.check_existence=(id)=>{
    const blogs=getAllBlogs();
    for(let i=0;i<blogs.length;i++){
        if(blogs[i].id==id) 
        return true;
    }return false;
}

exports.check_existenceUser=(id)=>{
    const users=getAllusers();
    for(let i=0;i<users.length;i++){
        if(users[i].id==id) 
        return true;
    }return false;
}

exports.addBlog= (req,res,next)=>{
    const users=getAllusers();
    for(let i=0;i<users.length;i++){
        for(let j=0;j<users.blogs.length;j++){
            if(this.check_existence(users[i].blogs[j])){
                res.send('Blog already exists')
            }else{
                const newBlog={id:blogs.length+1,
                title:'Blabla',
                content:'Whatever'}
                createBlog(newBlog) 
               } 
        }
    }
    res.send('Blog created successfully');
}

exports.getBlog= (req,res)=>{
    const postId=req.params.id;
    const blog=getAllBlogs().find((post)=>post.id===postId);
    if(blog){
        res.send(blog)
    }else{
        res.status(404).send('Blog not found !');
    }
}

exports.updateBlog=(req,res)=>{
    const index=req.params.id;
    if(this.check_existence(index)){
        modifyBlog(index,blogToUpdate);
        res.send(blogToUpdate);
        console.log('Updated!')
    }else{
        res.send('Blog not found')
    }  
}

exports.removeBlog=(req,res)=>{
    const index=req.params.id;
    if(this.check_existence(index)){
        deleteBlog(index);
        res.send('Blog deleted successfully');
        console.log('Deleted!')
    }else{
        res.send('Blog not found')
    }  
}

exports.addUser=(req,res)=>{
    const users=getAllusers();
    const userId=req.params.id;
    if(this.check_existenceUser(userId)){
        res.send('User already exists')
    }else{
        const newUser={
            id: users.length+1,
            name: 'Hicham',
            password: 'Hicham1234'
        }
        createUser(newUser);
        res.send(newUser);
        console.log('user created successfully');
    }
}

exports.register = (req, res) => {
    const { username, password } = req.body;
      console.log(username,password)
    const existingUser = users.find((user) => user.username === username);
  console.log(users)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const id = users.length + 1;
  
    const newUser = { id,username, password }
  
    users.push(newUser);
    createUsers(users);
  
    res.status(201).json({ message: 'User registered successfully', newUser });
  };
  
  
  exports.login = (req, res) => {
    const { username, password } = req.body;
  
   const user = users.find((user) => user.username === username && user.password === password);
    const token = jwt.sign(user,process.env.tokenUser,{expiresIn:'3h'});
    
    console.log(token)
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json({ message: 'Logged in successfully', user });
  };

     