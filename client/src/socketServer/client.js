import {io} from 'socket.io-client'
const socket = io('http://airsoft4ohio.com:5051')

socket.on('connect', () => {
  console.log("Socket ID:", socket.id)
})

