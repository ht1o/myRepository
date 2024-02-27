const { addUser, allUsers, allBlogs, removeBlog, addBlog, updateBlog, getBlog, check_existence, check_existenceUser, register, login } = require('../controllers/postController');

const router = require('express').Router();

router.post('/addUser',addUser );
router.get('/allUsers',allUsers);
router.get('/allBlogs',allBlogs);
router.post('/removeBlog',removeBlog);
router.post('/addBlog',addBlog);
router.post('/updateBlog',updateBlog);
router.get('/getBlog',getBlog);
router.get('/check_existence',check_existence);
router.get('/check_existenceUser',check_existenceUser);
router.post('/register',register);
router.post('/login',login);

module.exports=router;