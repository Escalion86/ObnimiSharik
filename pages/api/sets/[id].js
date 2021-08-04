import dbConnect from '@utils/dbConnect'
import Sets from '@models/Sets'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const set = await Sets.findById(id)
        if (!set) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: set })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const body = { ...req.body, updatedAt: Date.now() }
        const set = await Sets.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        })
        if (!set) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: set })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedSet = await Sets.deleteOne({ _id: id })
        if (!deletedSet) {
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
