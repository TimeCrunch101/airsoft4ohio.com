if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    console.log('Running Dev Build')
}
const port = process.env.EXPRESS_PORT || 5000;
const express = require('express');
const app = express();
// ROUTERS
const initGetRouter = require('./routers/getRouter')
// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// INIT ROUTERS
initGetRouter(app)
// Production Environment 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'))
    console.log(`Production server running ${process.env.SERVER}:${port}`)
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}
// Start Socket Server
const {startSocketServer} = require('./controllers/socketController')
startSocketServer()
// Start Express API
app.listen(port, () => {
    console.log(`Express API on ${process.env.SERVER}:${port}/api`)
})
