import dbConnect from '@utils/dbConnect'
import Products from '@models/Products'
import ProductTypes from '@models/ProductTypes'
import Sets from '@models/Sets'
import SetTypes from '@models/ProductTypes'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    // case 'GET':
    //   try {
    //     const products = await Products.find({})
    //     const productTypes = await ProductTypes.find({})
    //     const sets = await Sets.find({})
    //     const setTypes = await SetTypes.find({})
    //     res.status(200).json({
    //       success: true,
    //       data: { products, productTypes, sets, setTypes },
    //     })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break
    case 'POST':
      try {
        const products = await Products.create(
          req.body.products
        ) /* create a new model in the database */
        const productTypes = await ProductTypes.create(
          req.body.productTypes
        ) /* create a new model in the database */
        res
          .status(201)
          .json({ success: true, data: products, productyypes: productTypes })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
