const express = require('express');
const getController = require("../controllers/getController")
const auth = require("../controllers/auth/authController")
const getRouter = express.Router();

const initGetRouter = (app) => {
    
    getRouter.get('/api/get/user-profile', auth.isAuthenticated, getController.getUser)
    getRouter.get("/api/get/posts", getController.getPosts)
    getRouter.get("/api/get/post/:postID", getController.getPost)
    getRouter.get("/api/get/users", auth.isAuthenticated, getController.getUsers)
    getRouter.get("/api/enroll-mfa", auth.isAuthenticated, getController.enrollMFA)
    
    return app.use('/', getRouter)
}

module.exports = initGetRouter;