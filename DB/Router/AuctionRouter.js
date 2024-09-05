import { Router } from 'express'
import { MakeAuction } from '../Controllers/Auction/CreateAuction.js'
import { getAllAuctions } from '../Controllers/Auction/GetAllAuctions.js'
import { getSingleAuction } from '../Controllers/Auction/GetSingleAuction.js'
const AuctionRouter = Router()
AuctionRouter.post('/MakeAuction', MakeAuction)
AuctionRouter.get('/AllAuctions', getAllAuctions)
AuctionRouter.get('/SingleAuction', getSingleAuction)
/**give AuctionID as query */
export default AuctionRouter
