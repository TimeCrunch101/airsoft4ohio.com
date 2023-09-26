const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

exports.enrollMFA = (userEmail) => {
    return new Promise((resolve, reject) => {
        const secret = speakeasy.generateSecret({
            issuer: "Airsoft4Ohio",
            name: userEmail
        })
        QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
            try {
                if (err) throw err;
                resolve({
                    secret: secret.base32,
                    qrcode: data_url
                })
            } catch (error) {
                console.error(error)
                reject(error)
            }
          });
    })
}

exports.verifyTotp = (storedTotp, userTotp) => {
    return new Promise((resolve, reject) => {
        try {
            const verified = speakeasy.totp.verify({
                secret: storedTotp,
                encoding: "base32",
                token: userTotp,
            })
            resolve(verified)
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}