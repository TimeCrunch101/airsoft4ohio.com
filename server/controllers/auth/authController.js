if (process.env.NODE_ENV !== "production") require("dotenv").config()
const DB = require('../dbController')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { msgQueue } = require('../emailController')
const {v4: uuidv4} = require('uuid')

exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ", 2);
        const user = jwt.verify(token[1], process.env.JWT_SKEY);
        req.user = user;
        next();
    } catch (error) {
        res.sendStatus(401)
    }
};

exports.isNotAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ", 2);
        jwt.verify(token[1], process.env.JWT_SKEY);
        res.sendStatus(400);
    } catch (error) {
        next();
    }
};


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const exists = await DB.verifyUserNotExists(email, username)
        console.log("Exists: ",exists)
        if (!exists) {
            const hash = bcrypt.hashSync(password, 10);
            const userID = uuidv4();
            await DB.registerUser({userID, username, email, hash});
            res.status(200).json({
                success: true,
            });
        } else {
            res.status(400).json({
                error: "Email or username already exists"
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            cause: error.cause
        })
    }


};

exports.login = async (req, res) => {
    try {
        const user = await DB.getUserByEmail(req.body.email);
        const passMatch = await bcrypt.compare(req.body.password, user.password);
        if (passMatch) {
            const token = jwt.sign({
                userID: user.userID,
                firstname: user.firstname,
                lastname: user.lastname,
                fullname: user.fullname,
                email: user.email,
            },
            process.env.JWT_SKEY,
            { expiresIn: "16h" }
            );
            res.status(200).json({
                userID: user.userID,
                firstname: user.firstname,
                lastname: user.lastname,
                fullname: user.fullname,
                email: user.email,
                token: token,
          });
        } else {
            res.status(401).json({
                message: "Incorrect Username or Password",
            });
        }
    } catch (error) {
        res.status(500).json({
          error: error.message,
          cause: error.cause,
        });
    }
};

exports.passwordReset = (req, res) => {
    if (req.params.userEmail === null) res.sendStatus(400)
    DB.getUserByEmail(req.params.userEmail).then((data) => {
        const resetToken = uuidv4()
        DB.logResetToken(resetToken, data.email).then(() => {
            msgQueue.push({
                to: data.email,
                subject: 'Password Reset Request',
                body: ((process.env.NODE_ENV !== "production") ? `Here is your password reset link: http://localhost:5173/reset-password/${resetToken}` : `Here is your password reset link: https://airsoft4ohio.com/reset-password/${resetToken}`)
            })
        }).catch((err) => {
            res.status(500).json({
                error: err.message,
                cause: err.cause
            })
        })
    }).catch((err) => {
        console.error(err)
    })
    res.status(200).json({
        message: 'Thank you for your request. Keep an eye on your email.'
    })
}

exports.resetPassword = async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    try {
        await DB.resetPassword(req.params.token, hash)
        res.status(200).json({
            message: 'Password reset successfully'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            cause: error.cause
        })
    }
}

exports.validate = (req, res) => {
    res.status(200).json({
      success: true,
    });
  };