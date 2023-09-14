const {DB} = require('../configs/DB')

/**
 * @param {object} user 
 * @param {string} user.userID 
 * @param {string} user.username 
 * @param {string} user.email 
 * @param {string} user.password
 */

exports.registerUser = (user) => {
    console.log(user)
    return new Promise((resolve, reject) => {
        DB.query("INSERT INTO dbt_users SET ?", {
            userID: user.userID,
            username: user.username,
            email: user.email,
            password: user.hash
        }, (err) => {
            try {
                if (err) throw new Error("Could not register user", {cause: err.message})
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM dbt_users WHERE email = ? LIMIT 1", [email], (err, user) => {
            try {
                if (err) throw new Error('Could not retrieve user', {cause: err.message})
                if (user.length !== 1) {
                    throw new Error("No user found with that email")
                }
                resolve(user[0])
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.verifyUserNotExists = (email, username) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM dbt_users WHERE email = ? LIMIT 1", [email], (err1, userEmail) => {
            try {
                if (err1) throw new Error("Something went wrong with the database..", {cause: err1.message})
                DB.query("SELECT * FROM dbt_users WHERE username = ? LIMIT 1", [username], (err2, username) => {
                    try {
                        if (err2) throw new Error("Something went wrong with the database...", {cause: err2.message})
                        if (userEmail.length !== 1 && username.length !== 1) return resolve(false)
                    } catch (error2) {
                        reject(error2)
                    }
            })
            } catch (error1) {
                reject(error1)
            }
        })
    })
}

exports.logEmailStatus = (message) => {
    const store = JSON.stringify(message)
    DB.query("INSERT INTO email_logs SET ?", {message: store}, (err) => {
        if (err) console.error(err)
    })
}

exports.logResetToken = (token, email) => {
    return new Promise((resolve, reject) => {
        DB.query("UPDATE dbt_users SET reset_token = ? WHERE email = ?", [token, email], (err) => {
            try {
                if (err) new Error('Could not save reset token', {cause: err.message});
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.resetPassword = (token, password) => {
    return new Promise((resolve, reject) => {
        DB.query("UPDATE dbt_users SET password = ? WHERE reset_token = ?", [password, token], (err) => {
            try {
                if (err) throw new Error('Could not set new password', {cause: err.message})
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.storeMFAtoken = (totp, email) => {
    return new Promise((resolve, reject) => {
        DB.query("UPDATE dbt_users SET totp = ? WHERE email = ?", [totp, email], (err) => {
            try {
                if (err) throw err;
                resolve(true)
            } catch (error) {
                reject(err)
            }
        })
    })
}

exports.getUserSecret = (userID) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT totp FROM dbt_users WHERE userID = ?",[userID], (err, totp) => {
            try {
                if (err) throw new Error('Could not get totp', {cause: err.message})
                resolve(totp[0].totp)
            } catch (error) {
                reject(error)
            }
        })
    })
}