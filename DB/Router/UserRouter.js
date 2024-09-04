import express from 'express'
import { GetUser } from '../Controllers/User/GettingUserDetails.js'
const UserRouter = express.Router()
UserRouter.get('/GetUser', GetUser)
/**sending userID as a query */
export default UserRouter
