const express = require('express');
const getController = require("../controllers/getController")
const router = express.Router();

const initGetRouter = (app) => {
    router.get('/api/', getController.get)
    
    return app.use('/', router)
}

module.exports = router;
module.exports = initGetRouter;