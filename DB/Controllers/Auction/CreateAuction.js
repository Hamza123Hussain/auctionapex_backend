import { AuctionModel } from '../../Model/Auction.js'
import { ProductModel } from '../../Model/Product.js'
import { User } from '../../Model/User.js'
export const MakeAuction = async (req, res) => {
  const { product, startDate, endDate, currentBid, highestBidder } = req.body
  const CheckProduct = await ProductModel.findById(product)
  const CheckUser = await User.findById(highestBidder)
  //   if (!CheckProduct) {
  //     return res.status(404).json({ message: 'Product Not Found' })
  //   }
  // Validate input
  if (!product || !startDate || !endDate || !currentBid) {
    return res.status(400).json({ message: 'Missing required fields' })
  }
  try {
    // Create a new auction
    const auction = new AuctionModel({
      product,
      startDate,
      endDate,
      currentBid,
      highestBidder,
    })
    // Save the auction to the database
    await auction.save()
    // Respond with the created auction
    res.status(201).json({
      message: 'Auction created successfully',
      auction,

      CheckUser,
    })
  } catch (error) {
    // Handle any errors during the save operation
    res.status(500).json({
      message: 'Failed to create auction',
      error: error.message,
    })
  }
}
