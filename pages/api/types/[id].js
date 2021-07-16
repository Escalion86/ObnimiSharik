import dbConnect from '@utils/dbConnect'
import Types from '@models/Types'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const type = await Types.findById(id)
        if (!type) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: type })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const type = await Types.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!type) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: type })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedType = await Types.deleteOne({ _id: id })
        if (!deletedType) {
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
