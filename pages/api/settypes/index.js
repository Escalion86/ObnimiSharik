import dbConnect from '@utils/dbConnect'
import SetTypes from '@models/SetTypes'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const setTypes = await SetTypes.find(
          {}
        ) /* find all the data in our database */
        res.status(200).json({ success: true, data: setTypes })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    case 'POST':
      try {
        const setType = await SetTypes.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: setType })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedSetTypes = await SetTypes.deleteMany({})
        if (!deletedSetTypes) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
