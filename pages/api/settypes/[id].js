import dbConnect from '@utils/dbConnect'
import SetTypes from '@models/SetTypes'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const setType = await SetTypes.findById(id)
        if (!setType) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: setType })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const body = { ...req.body, updatedAt: Date.now() }
        const setType = await SetTypes.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        })
        if (!setType) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: setType })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedSetType = await SetTypes.deleteOne({ _id: id })
        if (!deletedSetType) {
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
