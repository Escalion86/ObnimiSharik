import dbConnect from '@utils/dbConnect'
import balloons from '@models/balloons'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const baloon = await balloons.findById(id)
        if (!baloon) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: baloon })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const baloon = await balloons.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!baloon) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: baloon })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedBaloon = await balloons.deleteOne({ _id: id })
        if (!deletedBaloon) {
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
