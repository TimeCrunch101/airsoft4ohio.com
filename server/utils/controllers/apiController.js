const mysql = require('mysql2')

exports.get = (req, res) => {
    res.sendStatus(200)
}
exports.notFound = (req, res) => {
    res.sendStatus(404)
}