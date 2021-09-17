// import dbConnect from '@utils/dbConnect'
import Clients from '@models/Clients'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(Clients, req, res)
  // const {
  //   query: { id },
  //   method,
  // } = req

  // await dbConnect()

  // switch (method) {
  //   case 'GET' /* Get a model by its ID */:
  //     try {
  //       const user = await Users.findById(id)
  //       if (!user) {
  //         return res.status(400).json({ success: false })
  //       }
  //       res.status(200).json({ success: true, data: user })
  //     } catch (error) {
  //       res.status(400).json({ success: false })
  //     }
  //     break

  //   case 'PUT' /* Edit a model by its ID */:
  //     try {
  //       const body = { ...req.body, updatedAt: Date.now() }
  //       const user = await Users.findByIdAndUpdate(id, body, {
  //         new: true,
  //         runValidators: true,
  //       })
  //       if (!user) {
  //         return res.status(400).json({ success: false })
  //       }
  //       res.status(200).json({ success: true, data: user })
  //     } catch (error) {
  //       res.status(400).json({ success: false })
  //     }
  //     break

  //   case 'DELETE' /* Delete a model by its ID */:
  //     try {
  //       const deletedUser = await Users.deleteOne({
  //         _id: id,
  //       })
  //       if (!deletedUser) {
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
