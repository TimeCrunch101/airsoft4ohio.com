const express = require('express');
const getController = require("../controllers/getController")
const router = express.Router();

const initAPIroutes = (app) => {
    router.get('/api/', getController.get)
    router.get('/api/*', getController.notFound)

    return app.use('/', router)
}

module.exports = router;
module.exports = initAPIroutes;