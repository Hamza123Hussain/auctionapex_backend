import { Router } from 'express'
import { MakeAuction } from '../Controllers/Auction/CreateAuction.js'
const AuctionRouter = Router()
AuctionRouter.post('/MakeAuction', MakeAuction)
export default AuctionRouter
