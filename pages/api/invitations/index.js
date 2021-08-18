// import dbConnect from '@utils/dbConnect'
import Invitations from '@models/Invitations'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(Invitations, req, res)
  // const { method } = req

  // await dbConnect()

  // switch (method) {
  //   case 'GET':
  //     try {
  //       const invitations = await Invitations.find(
  //         {}
  //       ) /* find all the data in our database */
  //       res.status(200).json({ success: true, data: invitations })
  //     } catch (error) {
  //       res.status(400).json({ success: false, error })
  //     }
  //     break
  //   case 'POST':
  //     try {
  //       const invitation = await Invitations.create(
  //         req.body
  //       ) /* create a new model in the database */
  //       res.status(201).json({ success: true, data: invitation })
  //     } catch (error) {
  //       res.status(400).json({ success: false, error })
  //     }
  //     break
  //   case 'DELETE' /* Delete a model by its ID */:
  //     try {
  //       const deletedInvitation = await Invitations.deleteMany({})
  //       if (!deletedInvitation) {
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
