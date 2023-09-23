const DB = require("./dbController")

exports.get = (req, res) => {
    res.sendStatus(200)
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await DB.getPosts()
        res.status(200).json({
            posts: posts
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            cause: error.cause
        })
    }
}