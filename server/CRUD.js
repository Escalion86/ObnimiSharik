import dbConnect from '@utils/dbConnect'

export default async function handler(Schema, req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        if (id) {
          const data = await Schema.findById(id)
          if (!data) {
            return res.status(400).json({ success: false })
          }
          res.status(200).json({ success: true, data })
        } else {
          const data = await Schema.find({})
          res.status(200).json({ success: true, data })
        }
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    case 'POST':
      try {
        if (id) {
          return res
            .status(400)
            .json({ success: false, error: 'No need to set Id' })
        } else {
          const data = await Schema.create(req.body)
          res.status(201).json({ success: true, data })
        }
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    case 'PUT' /* Edit a model by its ID */:
      try {
        if (id) {
          const body = { ...req.body, updatedAt: Date.now() }
          const data = await Schema.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
          })
          if (!data) {
            return res.status(400).json({ success: false })
          }
          res.status(200).json({ success: true, data })
        } else {
          return res.status(400).json({ success: false, error: 'No Id' })
        }
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE' /* Delete a model by its ID */:
      try {
        if (id) {
          const deletedData = await Schema.deleteOne({
            _id: id,
          })
          if (!deletedData) {
            return res.status(400).json({ success: false })
          }
        } else {
          const deletedData = await Schema.deleteMany({})
          if (!deletedData) {
            return res.status(400).json({ success: false })
          }
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
