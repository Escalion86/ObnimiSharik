import dbConnect from '@utils/dbConnect'
import ProductTypes from '@models/ProductTypes'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const productTypes = await ProductTypes.find(
          {}
        ) /* find all the data in our database */
        res.status(200).json({ success: true, data: productTypes })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const productType = await ProductTypes.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: productType })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    // case 'DELETE' /* Delete a model by its ID */:
    //   try {
    //     const deletedProductType = await ProductTypes.deleteMany({})
    //     if (!deletedProductType) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: {} })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break
    default:
      res.status(400).json({ success: false })
      break
  }
}
