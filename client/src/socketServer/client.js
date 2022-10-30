import {io} from 'socket.io-client'
const socket = io('http://localhost:5051')

socket.on('connect', () => {
  console.log("Socket ID:", socket.id)
})

