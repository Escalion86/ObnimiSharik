import dbConnect from '@utils/dbConnect'
import Products from '@models/Products'
import Types from '@models/Types'
import Sets from '@models/Sets'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const products = await Products.find({})
        const types = await Types.find({})
        const sets = await Sets.find({})
        res.status(200).json({ success: true, data: { products, types, sets } })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    // case 'POST':
    //   try {
    //     const product = await Products.create(
    //       req.body
    //     ) /* create a new model in the database */
    //     res.status(201).json({ success: true, data: product })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break
    default:
      res.status(400).json({ success: false })
      break
  }
}
