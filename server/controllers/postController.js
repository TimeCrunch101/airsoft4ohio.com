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

exports.enforceMFA = async (req, res) => {
    try {
        await DB.enforceMFA(req.user.userID)
        res.sendStatus(201)
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }
}

exports.disableMFA = async (req, res) => {
    try {
        await DB.disableMFA(req.user.userID)
        res.sendStatus(201)
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }
}

exports.purgeAccount = async (req, res) => {
    try {
        await DB.purgeAccount(req.user.userID)
        res.sendStatus(201)
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }
}