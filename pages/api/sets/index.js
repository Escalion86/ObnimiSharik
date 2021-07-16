import dbConnect from '@utils/dbConnect'
import Sets from '@models/Sets'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const sets = await Sets.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: sets })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const set = await Sets.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: set })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
