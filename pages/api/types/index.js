import dbConnect from '@utils/dbConnect'
import Types from '@models/Types'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const types = await Types.find(
          {}
        ) /* find all the data in our database */
        res.status(200).json({ success: true, data: types })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const type = await Types.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: type })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
