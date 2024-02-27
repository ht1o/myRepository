const fs=require('fs');
const { allBlogs } = require('../controllers/postController');



function getAllusers (){
    return JSON.parse(fs.readFileSync('./users','utf8'))
};




function getAllBlogs(){
     const users = getAllusers();
     for(let i=0;i<users.length;i++){
          return users.blogs[i];
     }

}

function createUser(user){
    const users= getAllusers();
    users.push(user)
    fs.writeFileSync('./users',JSON.stringify(users),'utf8')
}


function createBlog (blog){
    const blogs=getAllBlogs();
    blogs.push(blog);
     fs.writeFileSync('./users',JSON.stringify(blogs),'utf8');
};

function modifyBlog(blogId,updatedBlog){
     const index=blogs.findIndex(blog=>blog.id===blogId)
          if (index !== -1) {
              const blogToUpdate = blogs[index];
              blogToUpdate.title = updatedBlog.title !== undefined ? updatedBlog.title : blogToUpdate.title;
              blogToUpdate.content = updatedBlog.content !== undefined ? updatedBlog.content : blogToUpdate.content;
      
              fs.writeFileSync('./users',JSON.stringify(blogs) , 'utf8');
              return true; 
          }
      
          return false; 
     }          

function deleteBlog(blogId){
     const index=blogs.findIndex(blog=>blog.id===blogId);
     if(index!==-1){
          blogs.splice(index,1);
          fs.writeFileSync('./users',JSON.stringify(blogs),'utf8');
          return true;
     }
     return false;
};

module.exports= {getAllusers, getAllBlogs , createBlog , modifyBlog , deleteBlog , createUser};
