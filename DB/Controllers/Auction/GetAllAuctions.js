import { AuctionModel } from '../../Model/Auction.js'

export const getAllAuctions = async (req, res) => {
  try {
    // Find all auctions and populate the product and highestBidder fields
    const auctions = await AuctionModel.find()
      .populate('product') // Populate the product field with product details
      .populate('highestBidder') // Populate the highestBidder field with user details

    res.status(200).json(auctions)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve auctions',
      error: error.message,
    })
  }
}
