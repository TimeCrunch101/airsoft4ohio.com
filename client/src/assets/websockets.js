import {io} from "socket.io-client";

let socket;

if (process.env.NODE_ENV === "production") {
    socket = io("wss://airsoft4ohio.com:8443")
} else {
    socket = io("ws://localhost:8443")
}

socket.on("connect", () => {
    console.log(socket.id)
})


export {socket};