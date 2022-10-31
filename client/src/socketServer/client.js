import {io} from 'socket.io-client'
const socket = io('https://airsoft4ohio.com:5051')

socket.on('connect', () => {
  console.log("Socket ID:", socket.id)
})

