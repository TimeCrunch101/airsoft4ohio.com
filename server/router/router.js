const express = require('express');
const viewController = require('../controllers/viewController');
const router = express.Router();
const initWebRoutes = (app) => {
    router.get('/', viewController.homeView);
    router.get('/about', viewController.aboutView);
    router.get('/events', viewController.eventsView);
    router.get('/maps', viewController.mapsView);
    router.get('/login', viewController.loginView);
    router.get('/forums', viewController.forumsView);
    router.get('/create/post', viewController.createPostView)
    return app.use('/', router);
};
module.exports = router;
module.exports = initWebRoutes;
