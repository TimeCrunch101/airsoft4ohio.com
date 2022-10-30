if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const socketPort = process.env.SOCKET_PORT || 5001
const app = require('express')();
const httpServer = require('http').createServer(app);
const options = {
    cors: {
        origin: true,
        credentials: true
    }
};
const io = require('socket.io')(httpServer, options);

io.on('connection', socket => {
    console.log(`Socket link established, ID: ${socket.id}`)
})

const startSocketServer = () => {
    httpServer.listen(socketPort, () => {
        console.log(`Socket.io Server Running on ${process.env.SERVER}:${socketPort}/`)
    })
}

let emitMessage = (data) => {
    console.log(data)
    io.emit('server-msg', `${data}`)
}

module.exports = {
    startSocketServer: startSocketServer,
    emitMessage: emitMessage
}