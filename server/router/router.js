const express = require('express');
const apiController = require('../utils/controllers/apiController')
const router = express.Router();

const initAPIroutes = (app) => {
    router.get('/api/', apiController.get)
    router.get('/api/*', apiController.notFound)

    return app.use('/', router)
}

module.exports = router;
module.exports = initAPIroutes;