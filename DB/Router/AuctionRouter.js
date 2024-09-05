import { Router } from 'express'
import { MakeAuction } from '../Controllers/Auction/CreateAuction.js'
import { getAllAuctions } from '../Controllers/Auction/GetAllAuctions.js'
const AuctionRouter = Router()
AuctionRouter.post('/MakeAuction', MakeAuction)
AuctionRouter.get('/AllAuctions', getAllAuctions)
export default AuctionRouter
