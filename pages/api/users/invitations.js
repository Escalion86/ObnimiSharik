import dbConnect from '@utils/dbConnect'
import UsersInvitations from '@models/UsersInvitations'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const usersInvitations = await UsersInvitations.find(
          {}
        ) /* find all the data in our database */
        res.status(200).json({ success: true, data: usersInvitations })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const userInvitation = await UsersInvitations.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: userInvitation })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedUserInvitation = await UsersInvitations.deleteMany({})
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
