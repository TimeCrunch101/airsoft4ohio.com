const express = require('express');
const postController = require("../controllers/postController");
const auth = require('../controllers/auth/authController');
const postRouter = express.Router();

const initPostRouter = (app) => {
    postRouter.put('/api/register', auth.isNotAuthenticated, auth.register)
    postRouter.post('/api/login', auth.isNotAuthenticated, auth.login)
    postRouter.post('/api/validate', auth.isAuthenticated, auth.validate)
    postRouter.post("/api/verify-mfa-enrollment", auth.isNotAuthenticated, auth.verifyMFA)
    postRouter.put("/api/create-post", auth.isAuthenticated, postController.createPost)

    return app.use('/', postRouter)
}

module.exports = initPostRouter;