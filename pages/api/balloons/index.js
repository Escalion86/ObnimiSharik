import dbConnect from '../../../utils/dbConnect'
import Balloons from '../../../models/Balloons'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const balloons = await Balloons.find(
          {}
        ) /* find all the data in our database */
        res.status(200).json({ success: true, data: balloons })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const baloon = await Balloons.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: baloon })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
