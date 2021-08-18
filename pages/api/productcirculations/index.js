// import dbConnect from '@utils/dbConnect'
import ProductCirculations from '@models/ProductCirculations'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(ProductCirculations, req, res)
  // const { method } = req

  // await dbConnect()

  // switch (method) {
  //   case 'GET':
  //     try {
  //       const productCirculations = await ProductCirculations.find(
  //         {}
  //       ) /* find all the data in our database */
  //       res.status(200).json({ success: true, data: productCirculations })
  //     } catch (error) {
  //       res.status(400).json({ success: false, error })
  //     }
  //     break
  //   case 'POST':
  //     try {
  //       const productCirculation = await ProductCirculations.create(
  //         req.body
  //       ) /* create a new model in the database */
  //       res.status(201).json({ success: true, data: productCirculation })
  //     } catch (error) {
  //       res.status(400).json({ success: false, error })
  //     }
  //     break
  //   case 'DELETE' /* Delete a model by its ID */:
  //     try {
  //       const deletedProductCirculation = await ProductCirculations.deleteMany(
  //         {}
  //       )
  //       if (!deletedProductCirculation) {
  //         return res.status(400).json({ success: false })
  //       }
  //       res.status(200).json({ success: true, data: {} })
  //     } catch (error) {
  //       res.status(400).json({ success: false, error })
  //     }
  //     break
  //   default:
  //     res.status(400).json({ success: false })
  //     break
  // }
}
