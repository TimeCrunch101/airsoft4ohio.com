const DB = require("./dbController")

exports.get = (req, res) => {
    res.sendStatus(200)
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await DB.getPosts()
        res.status(200).json({
            posts
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            cause: error.cause
        })
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await DB.getPost(req.params.postID)
        res.status(200).json({
            post: post
        })
    } catch (error) {
        res.status(500).json({
            error: error.message // FIXME:
        })
    }    
}

exports.getUsers = async (req, res) => {
    try {
        const users = await DB.getUsers()
        const usersString = JSON.stringify(users)
        res.status(200).json({
            usersString
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            cause: error.cause
        })
    }
}