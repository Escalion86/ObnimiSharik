import dbConnect from '@utils/dbConnect'
import ProductCirculations from '@models/ProductCirculations'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const productCirculation = await ProductCirculations.findById(id)
        if (!productCirculation) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: productCirculation })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const body = { ...req.body, updatedAt: Date.now() }
        const productCirculation = await ProductCirculations.findByIdAndUpdate(
          id,
          body,
          {
            new: true,
            runValidators: true,
          }
        )

        if (!productCirculation) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: productCirculation })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedProductCirculation = await ProductCirculations.deleteOne({
          _id: id,
        })
        if (!deletedProductCirculation) {
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
