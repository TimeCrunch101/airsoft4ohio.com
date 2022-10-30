const mysql = require('mysql2')

exports.get = (req, res) => {
    res.json({
        message: 'API good to go'
    })
}
exports.notFound = (req, res) => {
    res.sendStatus(404)
}