if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    console.log('Running Dev Build')
}
const express = require('express');
const cors = require('cors')
const app = express();
const initGetRouter = require('./routers/getRouter')
const initPostRouter = require('./routers/postRouter')
const port = process.env.EXPRESS_PORT || 5000;
const corsConfig = {
    credentials: true,
    origin: true,
}
// ROUTERS

// Middleware
app.use(cors(corsConfig))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// INIT ROUTERS
initGetRouter(app)
initPostRouter(app)
// Production Environment 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'))
    console.log(`Production server running ${process.env.SERVER}:${port}`)
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}
// Start Socket Server
// const {startSocketServer} = require('./controllers/socketController')
// startSocketServer()
// Start Express API
app.listen(port, () => {
    console.log(`API: ${process.env.SERVER}:${port}/api`)
})
