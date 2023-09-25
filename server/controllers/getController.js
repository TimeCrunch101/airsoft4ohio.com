const DB = require("./dbController")

exports.getUser = async (req, res) => {
    console.log(req.user)
    const user = await DB.getUserByID(req.user.userID)
    console.log(user)
    res.status(200).json({
        user
    })
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
            error: error.message,
            cause: error.cause
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