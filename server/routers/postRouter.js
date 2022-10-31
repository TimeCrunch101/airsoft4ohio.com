const express = require('express');
const postController = require("../controllers/postController")
const postRouter = express.Router();

const initPostRouter = (app) => {
    postRouter.post('/api/create/user', postController.createUser)
    postRouter.post('/api/login', postController.login)

    return app.use('/', postRouter)
}

module.exports = postRouter;
module.exports = initPostRouter;