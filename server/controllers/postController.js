const {pool} = require('../DB/mysql')
const bcrypt = require('bcrypt')
const {v4: uuid} = require('uuid')
const {emailExists, checkPassword} = require('../utils/db_utils')
const validate = require('deep-email-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    const {username, email, password} = req.body
    if (username.length <= 3 || email.length === 0 || password.length === 0) {
        if (username.length <= 3){
            return res.json({success: false, message: 'Please use a longer username...'})
        }
        return res.json({success: false, message: 'No data provided'})
    } 
    const validateEmail = await validate.validate({
        email: email,
        validateRegex: true,
        validateMx: true,
        validateTypo: true,
        validateDisposable: true,
        validateSMTP: false
    })
    if (validateEmail.valid === false) return res.json({success: false, message: "Email failed validation, please use a real email address"})
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user_uuid = uuid()
    try {
        const exists = await emailExists(email, username)
        if (!exists) {
            pool.query("INSERT INTO dbt_users SET ?", {
                uuid: user_uuid,
                username: username,
                email: email,
                password: hash
            }, (err) => {
                if (err) throw err;
                res.json({
                    success: true,
                    message: 'User created',
                    user: {
                        uuid: user_uuid,
                        username: username,
                        email: email
                    }
                })
            })
        }
    } catch (err) {
        res.json({
            success: false,
            message: 'Username or email already exists'
        })
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await checkPassword(password, username)
        if (user) {
            const signUser = {
                username: user.username,
                uuid: user.uuid,
                email: user.email
            }
            const token = jwt.sign(signUser, process.env.JWT_KEY)
            res.json({
                success: true,
                user: {
                    uuid: user.uuid,
                    username: user.username,
                    email: user.email,
                    token: token
                }
            })
        } else {
            res.json({
                success: false,
                message: user
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }
}