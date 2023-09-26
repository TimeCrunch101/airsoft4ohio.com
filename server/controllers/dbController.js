const {DB} = require('../configs/DB')

exports.getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * from dbt_users WHERE username = ?", [username], (err, user) => {
            try {
                if (err) throw new Error("Could not get user", {cause: err.message})
                if (user.length === 1) {
                    resolve(user[0])
                } else {
                    resolve(user)
                }
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * from dbt_users WHERE email = ?", [email], (err, user) => {
            try {
                if (err) throw new Error("Could not get user", {cause: err.message})
                if (user.length === 1) {
                    resolve(user[0])
                } else {
                    resolve(user)
                }
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.getUserByID = (userID) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * from dbt_users WHERE userID = ?", [userID], (err, user) => {
            try {
                if (err) throw new Error("Could not get user", {cause: err.message})
                resolve(user[0])
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.createUser = (newUser) => {
    return new Promise((resolve, reject) => {
        DB.query("INSERT INTO dbt_users SET ?",{
            userID: newUser.userID,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
        }, (err) => {
            try {
                if (err) throw new Error("Could not create user", {cause: err.message})
                resolve(true)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.getUserSecretFromDb = (userID) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT totp FROM dbt_users WHERE userID = ?",[userID],(err, totp) => {
            try {
                if (err) throw new Error("Could not get Skey from DB", {cause: err.message});
                // if (totp[0].totp === null) throw new Error("No TOTP Saved!")
                resolve(totp[0].totp)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.sendSecretToDb = (userID, totp) => {
    return new Promise((resolve, reject) => {
        DB.query("UPDATE dbt_users SET totp = ? WHERE userID = ?",[totp, userID], (err) => {
            try {
                if (err) throw new Error("Could not store Skey to DB", {cause: err.message});
                resolve(true)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.createPost = (postID, userID, postContent, title) => {
    return new Promise((resolve, reject) => {
        DB.query("INSERT INTO dbt_posts SET ?", {
            postID: postID,
            userID: userID,
            postContent: postContent,
            title: title
        }, (err) => {
            try {
                if (err) throw new Error("Could not create Post",{cause: err.message})
                resolve(true)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.getPosts = () => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM dbt_posts", (err, posts) => {
            try {
                if (err) throw new Error("Could not get posts", {cause: err.message});
                resolve(posts)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.getPost = (postID) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM dbt_posts WHERE postID = ?", [postID], (err, post) => {
            try {
                if (err) throw new Error("Could not get post", {cause: err.message});
                resolve(post[0])
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM dbt_users", (err, users) => {
            try {
                if (err) throw new Error("Could not retrieve users", {cause: err.message})
                resolve(users)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.logResetToken = (token, userID) => {
    return new Promise((resolve, reject) => {
        DB.query("UPDATE dbt_users SET reset_token = ? WHERE userID = ?", [token, userID], (err) => {
            try {
                if (err) new Error('Could not save reset token', {cause: err.message});
                resolve(true)
            } catch (error) {
                console.error(error)
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
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.validateResetToken = (token) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT reset_token FROM dbt_users WHERE reset_token = ?", [token], (err, token) => {
            try {
                if (err) throw new Error("Could not validate token", {cause: err.message})
                if (token.length === 0) throw new Error("Token not valid")
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.newPassword = (userID, password) => {
    return new Promise((resolve, reject) => {
        DB.query("UPDATE dbt_users SET password = ? WHERE userID = ?", [password, userID], (err) => {
            try {
                if (err) throw new Error('Could not set new password', {cause: err.message})
                resolve(true)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    })
}

exports.removeResetToken = (userID) => {
    return new Promise((resolve, reject) => {
        DB.query("UPDATE dbt_users SET reset_token = NULL WHERE userID = ?",[userID], (err) => {
            try {
                if (err) throw new Error("Could not remove reset token", {cause: err.message})
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.enforceMFA = (userID) => {
    return new Promise((resolve, reject) => {
        DB.query("UPDATE dbt_users SET mfa_enforced = 1 WHERE userID = ?", [userID], (err) => {
            try {
                if (err) throw new Error("Could not enforce MFA", {cause: err.message})
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.disableMFA = (userID) => {
    return new Promise((resolve, reject) => {
        DB.query("UPDATE dbt_users SET totp = NULL, mfa_enforced = 0 WHERE userID = ?", [userID], (err) => {
            try {
                if (err) throw new Error("Could not disable MFA", {cause: err.message})
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.purgeAccount = (userID) => {
    return new Promise((resolve, reject) => {
        DB.query("DELETE FROM dbt_users WHERE userID = ?", [userID], (err) => {
            try {
                if (err) throw new Error("Could not delete user", {cause: err.message})
                resolve(true)
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