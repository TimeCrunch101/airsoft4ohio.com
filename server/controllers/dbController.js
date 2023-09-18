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
                reject(error)
            }
        })
    })
}

exports.getUserSecretFromDb = (userID) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT totp FROM dbt_users WHERE userID = ?",[userID],(err, totp) => {
            try {
                if (err) throw err;
                // if (totp[0].totp === null) throw new Error("No TOTP Saved!")
                resolve(totp[0].totp)
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.sendSecretToDb = (userID, totp) => {
    return new Promise((resolve, reject) => {
        DB.query("UPDATE dbt_users SET totp = ? WHERE userID = ?",[totp, userID], (err) => {
            try {
                if (err) throw err;
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.createPost = (postID, userID, postContent, title) => {
    return new Promise((resolve, reject) => {
        DB.query("INSERT INTO posts SET ?", {
            postID: postID,
            userID: userID,
            postContent: postContent,
            title: title
        }, (err) => {
            try {
                if (err) throw err;
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

exports.getPosts = () => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM posts", (err, posts) => {
            try {
                if (err) throw err;
                resolve(posts)
            } catch (error) {
                reject(error)
            }
        })
    })
}