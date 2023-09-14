const {DB} = require('../configs/DB')

exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email], (err, password) => {
            try {
                if (err) throw new Error('Could not retrieve user', {cause: err.message})
                if (password.length !== 1) {
                    throw new Error("No user found with that email")
                }
                resolve(password[0])
            } catch (error) {
                reject(error)
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
        DB.query("UPDATE users SET reset_token = ? WHERE email = ?", [token, email], (err) => {
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
        DB.query("UPDATE users SET password = ? WHERE reset_token = ?", [password, token], (err) => {
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
        DB.query("UPDATE users SET totp = ? WHERE email = ?", [totp, email], (err) => {
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
        DB.query("SELECT totp FROM users WHERE userID = ?",[userID], (err, totp) => {
            try {
                if (err) throw new Error('Could not get totp', {cause: err.message})
                resolve(totp[0].totp)
            } catch (error) {
                reject(error)
            }
        })
    })
}