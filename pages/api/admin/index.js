import dbConnect from '@utils/dbConnect'
import Products from '@models/Products'
import ProductTypes from '@models/ProductTypes'
import Sets from '@models/Sets'
import SetTypes from '@models/SetTypes'
import UsersInvitations from '@models/UsersInvitations'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const products = await Products.find({})
        const productTypes = await ProductTypes.find({})
        const sets = await Sets.find({})
        const setTypes = await SetTypes.find({})
        const usersInvitations = await UsersInvitations.find({})
        res.status(200).json({
          success: true,
          data: { products, productTypes, sets, setTypes, usersInvitations },
        })
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
