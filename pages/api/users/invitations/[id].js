import dbConnect from '@utils/dbConnect'
import UsersInvitations from '@models/UsersInvitations'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const userInvitation = await UsersInvitations.findById(id)
        if (!userInvitation) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: userInvitation })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const body = { ...req.body, updatedAt: Date.now() }
        const userInvitation = await UsersInvitations.findByIdAndUpdate(
          id,
          body,
          {
            new: true,
            runValidators: true,
          }
        )
        if (!userInvitation) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: userInvitation })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedUserInvitation = await UsersInvitations.deleteOne({
          _id: id,
        })
        if (!deletedUserInvitation) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
