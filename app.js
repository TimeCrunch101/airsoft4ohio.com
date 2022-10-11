// List the Dependencies
if (process.env.DEV) {
    require('dotenv').config();    
};
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const initWebRoutes = require('./server/router/router');

// Create Express Server
const app = express();
const PORT = 8080 || 5000;

// Express Handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

// Use JSON Format
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Static Public Folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/bs/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use('/bs/css', express.static(path.join(__dirname, "node_modules/bootstrap-icons")))
app.use("/bs/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/bs/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))

// Router Init
initWebRoutes(app);

// Init Listen
app.listen(PORT, () => console.log(`Server running http://127.0.0.1:${PORT}/`));