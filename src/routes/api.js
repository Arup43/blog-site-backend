const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const blogController = require('../controllers/blog');
const authVerifyMiddleware = require('../middlewares/authVerify');

// User Routes
router.post('/registration', userController.registration);
router.post('/login', userController.login);

// Blog Routes
router.post('/createBlog', authVerifyMiddleware, blogController.createBlog);
router.delete('/deleteBlog/:id', authVerifyMiddleware, blogController.deleteBlog);
router.patch('/updateBlog/:id', authVerifyMiddleware, blogController.updateBlog);
router.get('/getBlogsByEmail', authVerifyMiddleware, blogController.getBlogsByEmail);
router.get('/getAllBlogs', blogController.getAllBlogs);


module.exports = router;