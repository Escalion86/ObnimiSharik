import dbConnect from '@utils/dbConnect'
import Products from '@models/Products'
import ProductTypes from '@models/ProductTypes'
import Sets from '@models/Sets'
import SetTypes from '@models/SetTypes'
import Invitations from '@models/Invitations'
import Users from '@models/Users'
import ProductCirculations from '@models/ProductCirculations'
import Clients from '@models/Clients'
import Payments from '@models/Payments'
import Orders from '@models/Orders'
import DevToDo from '@models/DevToDo'

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
        const invitations = await Invitations.find({})
        const users = await Users.find({})
        const productCirculations = await ProductCirculations.find({})
        const clients = await Clients.find({})
        const payments = await Payments.find({})
        const orders = await Orders.find({})
        const devToDo = await DevToDo.find({})

        res.status(200).json({
          success: true,
          data: {
            products,
            productTypes,
            sets,
            setTypes,
            invitations,
            users,
            productCirculations,
            clients,
            orders,
            payments,
            devToDo,
          },
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
