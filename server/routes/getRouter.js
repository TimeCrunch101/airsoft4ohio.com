const express = require('express');
const getController = require("../controllers/getController")
const getRouter = express.Router();

const initGetRouter = (app) => {
    
    getRouter.get('/api/', getController.get)
    getRouter.get("/api/get/posts", getController.getPosts)
    getRouter.get("/api/get/post/:postID", getController.getPost)
    
    return app.use('/', getRouter)
}

module.exports = initGetRouter;