// import dbConnect from '@utils/dbConnect'
import Products from '@models/Products'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(Products, req, res)
  // const {
  //   query: { id },
  //   method,
  // } = req

  // await dbConnect()

  // switch (method) {
  //   case 'GET' /* Get a model by its ID */:
  //     try {
  //       const product = await Products.findById(id)
  //       if (!product) {
  //         return res.status(400).json({ success: false })
  //       }
  //       res.status(200).json({ success: true, data: product })
  //     } catch (error) {
  //       res.status(400).json({ success: false })
  //     }
  //     break

  //   case 'PUT' /* Edit a model by its ID */:
  //     try {
  //       const body = { ...req.body, updatedAt: Date.now() }
  //       const product = await Products.findByIdAndUpdate(id, body, {
  //         new: true,
  //         runValidators: true,
  //       })
  //       if (!product) {
  //         return res.status(400).json({ success: false })
  //       }
  //       res.status(200).json({ success: true, data: product })
  //     } catch (error) {
  //       res.status(400).json({ success: false })
  //     }
  //     break

  //   case 'DELETE' /* Delete a model by its ID */:
  //     try {
  //       const deletedProduct = await Products.deleteOne({ _id: id })
  //       if (!deletedProduct) {
  //         return res.status(400).json({ success: false })
  //       }
  //       res.status(200).json({ success: true, data: {} })
  //     } catch (error) {
  //       res.status(400).json({ success: false })
  //     }
  //     break

  //   default:
  //     res.status(400).json({ success: false })
  //     break
  // }
}
