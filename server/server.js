// Require Dotenv only in Development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const bodyParser = require('body-parser');
const initAPIrouter = require('./router/router')
const app = express();
// Middleware
app.use(bodyParser.json());
// INIT API Router
initAPIrouter(app)
// Production Environment 
if (process.env.NODE_ENV === 'production') {
    // Serve Public Static Folder
    app.use(express.static(__dirname + '/public'))
    // Handle SPA Routes
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`API running on ${port}`)
})