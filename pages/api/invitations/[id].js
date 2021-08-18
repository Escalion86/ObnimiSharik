// import dbConnect from '@utils/dbConnect'
import Invitations from '@models/Invitations'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(Invitations, req, res)
  // const {
  //   query: { id },
  //   method,
  // } = req

  // await dbConnect()

  // switch (method) {
  //   case 'GET' /* Get a model by its ID */:
  //     try {
  //       const invitation = await Invitations.findById(id)
  //       if (!invitation) {
  //         return res.status(400).json({ success: false })
  //       }
  //       res.status(200).json({ success: true, data: invitation })
  //     } catch (error) {
  //       res.status(400).json({ success: false })
  //     }
  //     break

  //   case 'PUT' /* Edit a model by its ID */:
  //     try {
  //       const body = { ...req.body, updatedAt: Date.now() }
  //       const invitation = await Invitations.findByIdAndUpdate(id, body, {
  //         new: true,
  //         runValidators: true,
  //       })
  //       if (!invitation) {
  //         return res.status(400).json({ success: false })
  //       }
  //       res.status(200).json({ success: true, data: invitation })
  //     } catch (error) {
  //       res.status(400).json({ success: false })
  //     }
  //     break

  //   case 'DELETE' /* Delete a model by its ID */:
  //     try {
  //       const deletedInvitation = await Invitations.deleteOne({
  //         _id: id,
  //       })
  //       if (!deletedInvitation) {
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
