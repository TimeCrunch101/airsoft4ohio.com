const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {v4: uuidv4} = require('uuid')

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
            console.error(error)
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

exports.generateResetToken = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const now = Date.now()
            const random = Math.floor(Math.random() * 50_000_000)
            const uuid = uuidv4()
            const seed = ((now+random).toString()+uuid)
            let newHash = ""
            const hash = bcrypt.hashSync(seed,10)
            for (let i = 0; i < hash.length; i++) {
                const element = hash[i];    
                if (element !== "." && element !== "/" && element !== "$") {
                    newHash += element
                }
            }
            resolve(newHash)
        } catch (error) {
            reject(error)
        } finally {
            newHash = null
        }
    })
}