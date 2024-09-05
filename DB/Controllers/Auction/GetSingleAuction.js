import { AuctionModel } from '../../Model/Auction.js'
export const getSingleAuction = async (req, res) => {
  const { AuctionID } = req.query
  try {
    // Find all auctions and populate the product and highestBidder fields
    const auction = await AuctionModel.findById(AuctionID)
      .populate('product') // Populate the product field with product details
      .populate('highestBidder') // Populate the highestBidder field with user details

    res.status(200).json(auction)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve auctions',
      error: error.message,
    })
  }
}
