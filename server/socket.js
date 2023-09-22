// const {Server} = require("socket.io");

// let io;

// if (process.env.NODE_ENV === "production") {
//     io = new Server({
//         cors: {
//             origin: "https://a4o.cincitechlabs.com"
//         }
//     })
// } else {
//     io = new Server({
//         cors: {
//             origin: "http://localhost:5173"
//         }
//     })
// }

// io.on("connection", (socket) => {
//     console.log("Client Connected")
//     socket.on("client-msg", (data) => {
//         console.log(data)
//         socket.emit("server-msg", 'This is a message emitted from the servers')
//     })
// });

// exports.emitMessage = (data) => {
//     console.log(data)
//     io.emit('server-msg', `${data}`)
// }

// io.listen(8443, console.info("WS: ws://localhost:8443"));