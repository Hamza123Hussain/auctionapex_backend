import express from 'express'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import cors from 'cors'
import { Port1 } from './Config.js'
import { connectDB } from './DBconnect.js'
const app = express()
// CORS configuration
const corsOptions = {
  origin: '*', // Adjust according to your deployment needs
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}

app.use(cors(corsOptions))
app.use(express.json())
// Create HTTP server
const server = http.createServer(app)
// Initialize Socket.IO server
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Adjust according to your deployment needs
    methods: ['GET', 'POST'],
  },
})

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A user connected')
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

connectDB()

// Start the server
server.listen(Port1, () => {
  console.log(`App and WebSocket server running on http://localhost:${Port1}`)
})
