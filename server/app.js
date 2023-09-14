if (process.env.NODE_ENV !== 'production') require('dotenv').config()
require("./socket")
const express = require('express')
const rateLimit = require('express-rate-limit');
const cors = require('cors')
const app = express()
const initGetRouter = require('./routes/getRouter')
const initPostRouter = require('./routes/postRouter')

const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 700,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

if (process.env.NODE_ENV === 'production') {
    app.use('/', apiLimiter)
    app.use(express.static(__dirname + '/public'))
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
} else {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
}

initGetRouter(app)
initPostRouter(app)

app.all('/*', (req, res) => {
    res.status(404).json({
        error: 404,
        message: 'You were lost, but now you are found.'
    })
})

app.listen(8080, console.info('API: http:localhost:8080/'))