import {io} from "socket.io-client";

let socket;

if (process.env.NODE_ENV === "production") {
    socket = io("wss://a4o.cincitechlabs.com:8443")
} else {
    socket = io("ws://localhost:8443")
}

socket.on("connect", () => {
    console.log(socket.id)
})


export {socket};