import { ProductModel } from '../../Model/Product.js'

export const CreateProduct = async (req, res) => {
  const { productName, price, auctionEndDate, status } = req.body

  const image = req.file ? req.file.path : null // Get the image path
  try {
    const NewProduct = ProductModel({
      productName,
      price,
      auctionEndDate,
      status,
      image,
    })
    await NewProduct.save()
    res.status(201).json({ productName, price, auctionEndDate, status, image })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
