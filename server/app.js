if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const rateLimit = require('express-rate-limit');
const cors = require('cors')
const app = express()
const Cluster = require("node:cluster")
const {availableParallelism} = require("node:os")

const CPUcount = availableParallelism()

if (Cluster.isPrimary) {
    require("./socket")
    for (let i = 0; i < CPUcount; i++) {
        Cluster.fork()
    }
    Cluster.on("exit", (worker, code, signal) => {
        console.warn(`Worker ${worker.process.pid} died`)
    })
} else {
    app.set("trust proxy", 2)
    const initGetRouter = require('./routes/getRouter')
    const initPostRouter = require('./routes/postRouter')
    
    if (process.env.NODE_ENV !== 'production') {
        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
        }))
    }
    
    const apiLimiter = rateLimit({
        windowMs: 5 * 60 * 1000, // 15 minutes
        max: 700,
        standardHeaders: true,
        legacyHeaders: false,
    })
    
    app.use(express.urlencoded({extended:true,limit: "50mb"}));
    app.use(express.json({limit: '50mb'}));
    app.use((req, res, next) => {
        res.locals.user = req.user
        next()
    })
    
    initGetRouter(app)
    initPostRouter(app)
    
    if (process.env.NODE_ENV === 'production') {
        app.use('/', apiLimiter)
        app.use(express.static(__dirname + '/public'))
        app.get(/.*/, (req, res) => {
            res.sendFile(__dirname + '/public/index.html')
        })
    }

    app.all('/*', (req, res) => {
        res.status(404).json({
            error: 404,
            message: 'You were lost, but now you are found.'
        })
    })

    app.listen(8080, console.info('API: http:localhost:8080/'))
}