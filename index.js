import express from 'express' // Import Express framework
import http from 'http' // Import HTTP module for creating the server
import { Server as SocketIOServer } from 'socket.io' // Import Socket.IO server
import cors from 'cors' // Import CORS middleware
import { Port1 } from './Config.js' // Import port number from the configuration file
import { connectDB } from './DBconnect.js' // Import database connection function
import AuthRouter from './DB/Router/AuthRouter.js' // Import authentication routes
import path from 'path' // Import path module for handling file paths
import { fileURLToPath } from 'url' // Import fileURLToPath function for converting URL to file path
import ProductRouter from './DB/Router/ProductRouter.js'
import AuctionRouter from './DB/Router/AuctionRouter.js'
const app = express() // Create an Express application
// CORS configuration
const corsOptions = {
  origin: '*', // Allow requests from any origin; adjust as needed for security
  methods: ['GET', 'POST'], // Allow only GET and POST methods
}
app.use(cors(corsOptions)) // Use CORS middleware with the defined options
app.use(express.json()) // Middleware to parse JSON request bodies

// Define __dirname for ES module support
const __filename = fileURLToPath(import.meta.url) // Get the current module's file path
const __dirname = path.dirname(__filename) // Get the directory name of the current file
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) // Serve static files from the 'uploads' directory
// Create HTTP server
const server = http.createServer(app) // Create an HTTP server with the Express app
// Initialize Socket.IO server
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Allow Socket.IO connections from any origin; adjust as needed for security
    methods: ['GET', 'POST'], // Allow only GET and POST methods for Socket.IO
  },
})
// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A user connected') // Log when a user connects
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected') // Log when a user disconnects
  })
})
// Use authentication routes
app.use('/API/AUTH', AuthRouter) // Mount the authentication router on the '/API/AUTH' path
app.use('/API/Product', ProductRouter)
app.use('/API/Auction', AuctionRouter)
// Connect to the database
connectDB() // Establish a connection to the database
// Start the server
server.listen(Port1, () => {
  console.log(`App and WebSocket server running on http://localhost:${Port1}`) // Log that the server is running
})
