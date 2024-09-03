import { Router } from 'express'
import { CreateProduct } from '../Controllers/Product/CreateANewProduct.js'
import { upload } from '../Middleware/Multer.js'
const ProductRouter = Router()
ProductRouter.post('/AddProduct', upload.single('image'), CreateProduct)

export default ProductRouter
