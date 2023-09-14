const express = require('express');
const postController = require("../controllers/postController")
const postRouter = express.Router();

const initPostRouter = (app) => {
    postRouter.post('/api/test', postController.test)

    return app.use('/', postRouter)
}

module.exports = postRouter;
module.exports = initPostRouter;