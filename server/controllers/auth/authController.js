if (process.env.NODE_ENV !== "production") require("dotenv").config()
const DB = require('../dbController')
const bcrypt = require('bcrypt')
const mfa = require("./mfaController")
const TC = require('./tokenController')
const { msgQueue } = require('../emailController')
const {v4: uuidv4} = require('uuid')

exports.isAuthenticated = async (req, res, next) => {
    try {
        const header = req.headers.authorization
        if (header) {
            const arrayFromString = header.split(" ", 2)
            const tokenFromArray = arrayFromString[1]
            const isValid = await TC.validateToken(tokenFromArray)
            if (isValid.success === true) {
                req.user = isValid.token
                next()
            } else {
                res.sendStatus(401)
            }
        } else {
            throw "Could not authenticate you"
        }
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

exports.isNotAuthenticated = async (req, res, next) => {
    try {
        const header = req.headers.authorization
        if (!header) {
            return next()
        } else {
            const arrayFromString = header.split(" ", 2)
            const tokenFromArray = arrayFromString[1]
            const isValid = await TC.validateToken(tokenFromArray)
            if (isValid.success === true) {
                res.status(400).json({
                    success: false,
                    error: "You are already authenticated"
                })
            } else if (isValid === "invalid signature") {
                return next()
            }
        }
    } catch (error) {
        res.sendStatus(400) // TODO: Send something more informative
    }
}


exports.register = (req, res) => {
    Promise.all([
        utils.checkIfUserExits(req.body.username),
        utils.validatePassword(req.body.password),
        utils.checkIfEmailExists(req.body.email),
        utils.validateEmail(req.body.email),
    ]).then(async() => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        await DB.registerUser({
            userID: uuidv4(),
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        res.status(201).json({
            success: true,
            message: "User Created"
        })
    }).catch((err) => {
        res.status(400).json({
            error: err
        })
    })
}

exports.login = async (req, res) => {
    try {
        const user = await DB.getUserByUsername(req.body.username)
        if (user.length === undefined) {
            const passMatch = bcrypt.compareSync(req.body.password, user.password)
            if (!passMatch) throw new Error("Password Incorrect")
            if (user.mfa_enforced && req.body.totp) {
                const keyFromDb = await DB.getUserSecretFromDb(user.userID)
                const verifyMFA = await mfa.verifyTotp(keyFromDb, req.body.totp)
                if (verifyMFA) {
                    const token = await TC.tokenGen({
                        userID: user.userID,
                        username: user.username,
                        email: user.email,
                        enforceMFA: (user.mfa_enforced === 1) ? true : false
                    },null)
                    res.status(200).json({
                        success: true,
                        username: user.username,
                        email: user.email,
                        token: token,
                    })
                } else {
                    throw "Second Factor Failed"
                }
            } else if (user.mfa_enforced && !req.body.totp) {
                const checkForTotp = await DB.getUserSecretFromDb(user.userID)
                if (checkForTotp === null) {
                    const mfaEnrollment = await mfa.enrollMFA(user.email)
                    await DB.sendSecretToDb(user.userID, mfaEnrollment.secret)
                    res.status(200).json({
                        mfaEnrollment: true,
                        userSecret: mfaEnrollment.secret,
                        qrcode: mfaEnrollment. qrcode
                    })
                } else {
                    res.status(200).json({
                        firstFactor: true
                    })
                }
            } else if (!user.mfa_enforced) {
                const token = await TC.tokenGen({
                    username: user.username,
                    email: user.email,
                    enforceMFA: user.mfa_enforced
                },null)
                res.status(200).json({
                    success: true,
                    token: token,
                })
            }
        } else {
            throw new Error("User Doesn't Exist")
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({
            success: false,
            error: error.message
        })
    }

}

exports.verifyMFA = async (req, res) => {
    try {
        const user = await DB.getUserByUsername(req.body.username)
        const testMFA = await mfa.verifyTotp(user.totp, req.body.testTotp)
        if (testMFA) {
            res.sendStatus(200)
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

exports.validate = (req, res) => {
    res.status(200).json({
        success: true,
    });
};

// exports.passwordReset = (req, res) => {
//     if (req.params.userEmail === null) res.sendStatus(400)
//     DB.getUserByEmail(req.params.userEmail).then((data) => {
//         const resetToken = uuidv4()
//         DB.logResetToken(resetToken, data.email).then(() => {
//             msgQueue.push({
//                 to: data.email,
//                 subject: 'Password Reset Request',
//                 body: ((process.env.NODE_ENV !== "production") ? `Here is your password reset link: http://localhost:5173/reset-password/${resetToken}` : `Here is your password reset link: https://airsoft4ohio.com/reset-password/${resetToken}`)
//             })
//         }).catch((err) => {
//             res.status(500).json({
//                 error: err.message,
//                 cause: err.cause
//             })
//         })
//     }).catch((err) => {
//         console.error(err)
//     })
//     res.status(200).json({
//         message: 'Thank you for your request. Keep an eye on your email.'
//     })
// }

// exports.resetPassword = async (req, res) => {
//     const hash = bcrypt.hashSync(req.body.password, 10);
//     try {
//         await DB.resetPassword(req.params.token, hash)
//         res.status(200).json({
//             message: 'Password reset successfully'
//         })
//     } catch (error) {
//         res.status(500).json({
//             error: error.message,
//             cause: error.cause
//         })
//     }
// }
