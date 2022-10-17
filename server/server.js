if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const bodyParser = require('body-parser');
const initAPIrouter = require('./router/router')
const app = express();
// Middleware
app.use(bodyParser.json());
// INIT Router
initAPIrouter(app)
// Handle Prod
if (process.env.NODE_ENV === 'production') {
    // Static Folder
    app.use(express.static(__dirname + '/public'))
    // Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}
const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`API running on ${port}`)
})