const express = require('express');
const postController = require("../controllers/postController");
const auth = require('../controllers/auth/authController');
const postRouter = express.Router();

const initPostRouter = (app) => {
    postRouter.put('/api/register', auth.isNotAuthenticated, auth.register)
    postRouter.post("/api/forgot-password", auth.isNotAuthenticated, auth.passwordReset)
    postRouter.post("/api/reset-password", auth.isNotAuthenticated, auth.resetPassword)
    postRouter.post('/api/login', auth.isNotAuthenticated, auth.login)
    postRouter.post('/api/validate', auth.isAuthenticated, auth.validate)
    postRouter.post("/api/verify-mfa-enrollment", auth.isNotAuthenticated, auth.verifyMFA)
    postRouter.put("/api/create-post", auth.isAuthenticated, postController.createPost)
    postRouter.post("/api/validate/mfa-enrollment", auth.isAuthenticated, auth.verifyMFA)
    postRouter.patch("/api/enforce/mfa", auth.isAuthenticated, postController.enforceMFA)
    postRouter.patch("/api/disable/mfa", auth.isAuthenticated, postController.disableMFA)
    postRouter.delete("/api/purge-account", auth.isAuthenticated, postController.purgeAccount)
    postRouter.patch("/api/set-new/password", auth.isAuthenticated, auth.resetPassword)

    return app.use('/', postRouter)
}

module.exports = initPostRouter;