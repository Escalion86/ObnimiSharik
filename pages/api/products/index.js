import dbConnect from '@utils/dbConnect'
import Products from '@models/Products'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()
  console.log(`method`, method)
  switch (method) {
    case 'GET':
      try {
        const products = await Products.find(
          {}
        ) /* find all the data in our database */
        res.status(200).json({ success: true, data: products })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const product = await Products.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    // case 'DELETE' /* Delete a model by its ID */:
    //   try {
    //     const deletedProducts = await Products.deleteMany({})
    //     if (!deletedProducts) {
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
