import {io} from 'socket.io-client'
const socket = io('http://localhost:5051/socket')

socket.on('connect', () => {
  console.log("Socket ID:", socket.id)
})

