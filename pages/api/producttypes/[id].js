import dbConnect from '@utils/dbConnect'
import ProductTypes from '@models/ProductTypes'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const productType = await ProductTypes.findById(id)
        if (!productType) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: productType })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const productType = await ProductTypes.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!productType) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: productType })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedProductType = await ProductTypes.deleteOne({ _id: id })
        if (!deletedProductType) {
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
