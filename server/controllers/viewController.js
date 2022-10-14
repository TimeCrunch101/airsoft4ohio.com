let homeView = (req, res) => {
    res.render('home');
};
let aboutView = (req, res) => {
    res.render('about');
};
let eventsView = (req, res) => {
    res.render('events');
};
let mapsView = (req, res) => {
    res.render('maps');
};
let loginView = (req, res) => {
    res.render('login');
};
let forumsView = (req, res) => {
    res.render('forums');
};
let createPostView = (req, res) => {
    res.render('createPost');
};
let fieldsView = (req, res) => {
    res.render('fields');
};
module.exports = {
    homeView: homeView,
    aboutView: aboutView,
    eventsView: eventsView,
    mapsView: mapsView,
    loginView: loginView,
    forumsView: forumsView,
    createPostView: createPostView,
    fieldsView: fieldsView,
};