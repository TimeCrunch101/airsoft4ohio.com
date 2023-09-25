const DB = require("../controllers/dbController")
const validate = require("deep-email-validator")

exports.validateEmail = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            const status = await validate.validate({
                email: email,
                validateRegex: true,
                validateMx: true,
                validateTypo: true,
                validateSMTP: false,
            })
            if (status.valid === false) throw new Error("Email not valid, please use a real email address")
            resolve(true)
        } catch (error) {
            reject(error.message)
        }
    })
}

exports.checkIfUserExits = (username) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await DB.getUserByUsername(username)
            if (user.length === 0) {
                resolve(true)
            } else {
                throw new Error("That user already exists")
            }
        } catch (error) {
            reject(error.message)
        }
    })
}

exports.checkIfEmailExists = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await DB.getUserByEmail(email)
            if (user.length === 0) {
                resolve(true)
            } else {
                throw new Error("That email already exists")
            }
        } catch (error) {
            reject(error.message)
        }
    })
}

exports.validatePassword = (pass) => {
    return new Promise((resolve, reject) => {
        try {
            if (pass.length < 7) throw new Error("Password length too short");
            const charsUpper = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
            const numbers = ["0","1","2","3","4","5","6","7","8","9"]
            const specials = ["~","!","@","#","$","%","^","&","*","(",")","_","+","-","=","<",">","?","\"",":","{","}","|",",",".","/",";","'","[","]","\\"," "]
            let upperCount = 0;
            let numberCount = 0;
            let specialCount = 0;
    
            const newArray = pass.split("")
            for (let i = 0; i < newArray.length; i++) {
                const element = newArray[i];
                for (let j = 0; j < charsUpper.length; j++) {
                    const upper = charsUpper[j];
                    if (element === upper) {
                        upperCount++
                    }
                }
            }
            for (let i = 0; i < newArray.length; i++) {
                const element = newArray[i];
                for (let j = 0; j < numbers.length; j++) {
                    const number = numbers[j];
                    if (element === number) {
                        numberCount++
                    }
                }
            }
            for (let i = 0; i < newArray.length; i++) {
                const element = newArray[i];
                for (let j = 0; j < specials.length; j++) {
                    const special = specials[j];
                    if (element === special) {
                        specialCount++
                    }
                }
            }
            if (upperCount >= 1 && numberCount >= 1 && specialCount >= 1) {
                resolve(true)
            } else {
                throw new Error("Password complexity requirement not met")
            }
        } catch (error) {
            reject(error.message)
        } finally {
            upperCount = 0
            numberCount = 0
            specialCount = 0
        }
    })
}
// exports.createUser = async () => {
//     const {username, email, password} = req.body
//     if (username.length <= 3 || email.length === 0 || password.length === 0) {
//         if (username.length <= 3){
//             return res.json({success: false, message: 'Please use a longer username...'})
//         }
//         return res.json({success: false, message: 'No data provided'})
//     } 
//     const validateEmail = await validate.validate({
//         email: email,
//         validateRegex: true,
//         validateMx: true,
//         validateTypo: true,
//         validateDisposable: true,
//         validateSMTP: false
//     })
//     if (validateEmail.valid === false) return res.json({success: false, message: "Email failed validation, please use a real email address"})
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
//     const user_uuid = uuid()
//     try {
//         const exists = await emailExists(email, username)
//         if (!exists) {
//             pool.query("INSERT INTO dbt_users SET ?", {
//                 uuid: user_uuid,
//                 username: username,
//                 email: email,
//                 password: hash
//             }, (err) => {
//                 if (err) throw err;
//                 res.json({
//                     success: true,
//                     message: 'User created',
//                     user: {
//                         uuid: user_uuid,
//                         username: username,
//                         email: email
//                     }
//                 })
//             })
//         }
//     } catch (err) {
//         res.json({
//             success: false,
//             message: 'Username or email already exists'
//         })
//     }
// }
