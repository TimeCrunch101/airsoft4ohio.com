if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const nodemailer = require('nodemailer')
const DB = require('./dbController')

exports.msgQueue = []

const sendEmail = (to, subject, body) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        html: body
    }
    transporter.sendMail(mailOptions, (err, info) => {
        DB.logEmailStatus(info)
        if (err) console.error('Could not send email, check the logs for more details');
        console.info('EMAIL SENT TO ', to)
    })
}

setInterval(() => {
    if (this.msgQueue.length > 0) {
        sendEmail(this.msgQueue[0].to, this.msgQueue[0].subject, this.msgQueue[0].body)
        this.msgQueue.shift()
    }   
}, 500);