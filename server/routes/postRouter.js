const express = require('express');
const postController = require("../controllers/postController");
const auth = require('../controllers/auth/authController');
const postRouter = express.Router();

const initPostRouter = (app) => {
    postRouter.put('/api/register', auth.isNotAuthenticated, auth.register)
    postRouter.post('/api/login', auth.isNotAuthenticated, auth.login)
    postRouter.post('/api/validate', auth.isAuthenticated, auth.validate)

    return app.use('/', postRouter)
}

module.exports = postRouter;
module.exports = initPostRouter;