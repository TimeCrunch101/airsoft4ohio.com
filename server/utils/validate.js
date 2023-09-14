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