const DB = require("./dbController")
const {v4: uuidv4} = require("uuid")

exports.test = (req, res) => {
    res.sendStatus(200)
}

exports.createPost = async (req, res) => {
    try {
        await DB.createPost(uuidv4(), req.user.userID, req.body.postContent, req.body.title)
        res.status(201).json({
            message: "Created"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            cause: error.cause
        })
    }
}