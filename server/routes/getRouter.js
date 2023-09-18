const express = require('express');
const getController = require("../controllers/getController")
const getRouter = express.Router();

const initGetRouter = (app) => {
    
    getRouter.get('/api/', getController.get)
    getRouter.get("/api/get/posts", getController.getPosts)
    
    return app.use('/', getRouter)
}

module.exports = initGetRouter;