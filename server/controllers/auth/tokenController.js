const jwt = require("jsonwebtoken")

exports.tokenGen = (user, options) => {
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign({
                userID: user.userID,
                username: user.username,
                email: user.email,
                enforceMFA: user.mfa_enforced
            },process.env.JWT_SKEY,{
                expiresIn: "10h"
            })
            resolve(token)
        } catch (error) {
            reject(error)
        }
    })
}

exports.validateToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SKEY, (err, decoded) => {
            if (err) {
                return resolve(err.message)
            } else {
                return resolve({
                    success: true,
                    token: decoded
                })
            }
        })
    })
}