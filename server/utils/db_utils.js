const {pool} = require('../DB/mysql');
const bcrypt = require('bcrypt');

const emailExists = (email, username) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query("SELECT email FROM dbt_users WHERE email = ?", [email], (err, dbemail) => {
                if (err) throw err;
                pool.query("SELECT username FROM dbt_users WHERE username =?", [username], (err, dbusername) => {
                    if (err) throw err;
                    if (dbemail.length === 0 && dbusername.length === 0) resolve(false)
                    reject('Username or Email is already taken')
                })
            })
        } catch (err) {
            reject(err)
        }
    })
}

const checkPassword = (formPassword, formUsername) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query("SELECT * FROM dbt_users WHERE username =?", [formUsername], (err, data) => {
                if (err) throw err;
                const DBpassword = data[0]?.password
                if (DBpassword !== undefined) {
                    bcrypt.compare(formPassword, DBpassword).then((isMatch) => {
                        if (isMatch) {
                            resolve(data[0])
                        } else {
                            reject('Username or password is incorrect')
                        }
                    })
                } else {
                    reject('Username or password is incorrect')
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    emailExists,
    checkPassword
}