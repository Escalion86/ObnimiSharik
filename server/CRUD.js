import dbConnect from '@utils/dbConnect'
import { getSession } from 'next-auth/react'
import Notifications from '@models/Notifications'
import Products from '@models/Products'
import ProductCirculations from '@models/ProductCirculations'
import Payments from '@models/Payments'
import Orders from '@models/Orders'
import Users from '@models/Users'
import Districts from '@models/Districts'
import DevToDo from '@models/DevToDo'
import Clients from '@models/Clients'
import SetTypes from '@models/SetTypes'
import ProductTypes from '@models/ProductTypes'
import Sets from '@models/Sets'
import Invitations from '@models/Invitations'
import UsersNotifications from '@models/UsersNotifications'

const dbNameFromSchema = (Schema) => {
  switch (Schema) {
    case Products:
      return 'products'
    case Sets:
      return 'sets'
    case ProductTypes:
      return 'productTypes'
    case SetTypes:
      return 'setTypes'
    case Clients:
      return 'clients'
    case DevToDo:
      return 'devToDo'
    case Districts:
      return 'districts'
    case Users:
      return 'users'
    case Orders:
      return 'orders'
    case Payments:
      return 'payments'
    case ProductCirculations:
      return 'productCirculations'
    case Invitations:
      return 'invitations'
    default:
      return null
  }
}

const prepareData = (data) => {
  if (!data) return data
  const preparedData = { ...data }
  if (preparedData._doc._id) delete preparedData._doc._id
  if (preparedData._doc.createdAt) delete preparedData._doc.createdAt
  return preparedData
}

export default async function handler(Schema, req, res, params = null) {
  const session = await getSession({ req })
  if (!session || !session.user._id)
    return res?.status(400).json({ success: false })

  const { query, method, body } = req

  const id = query?.id

  // console.log(`session.user`, session.user)

  await dbConnect()

  let data
  let oldData

  switch (method) {
    case 'GET':
      try {
        if (id) {
          data = await Schema.findById(id)
          if (!data) {
            return res?.status(400).json({ success: false })
          }
          return res?.status(200).json({ success: true, data })
        } else {
          data = await Schema.find(params)
          if (!data) {
            return res?.status(400).json({ success: false })
          }
          return res?.status(200).json({ success: true, data })
          // return { newData: data, oldData }
          // return res?.status(400).json({ success: false, error: 'No Id' })
        }
      } catch (error) {
        console.log(error)
        return res?.status(400).json({ success: false, error })
      }
      break
    case 'POST':
      try {
        if (id) {
          return res
            ?.status(400)
            .json({ success: false, error: 'No need to set Id' })
        } else {
          data = await Schema.create(body)
          if (!data) {
            return res?.status(400).json({ success: false })
          }
          // Добавляем уведомление о создании
          if (Schema === Products || Schema === Sets)
            await Notifications.create({
              responsibleUserId: session.user._id,
              dbName: dbNameFromSchema(Schema),
              itemId: data._id,
              oldItem: null,
              newItem: prepareData(data),
              status: 'add',
            })

          return res?.status(201).json({ success: true, data })
          // return { newData: data, oldData }
        }
      } catch (error) {
        console.log(error)
        return res?.status(400).json({ success: false, error })
      }
      break
    case 'PUT' /* Edit a model by its ID */:
      try {
        if (id) {
          data = await Schema.findById(id)
          if (!data) {
            return res?.status(400).json({ success: false })
          } else {
            oldData = data
          }
          data = await Schema.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
          })
          if (!data) {
            return res?.status(400).json({ success: false })
          }
          // Добавляем уведомление об изменении
          if (Schema === Products || Schema === Sets)
            await Notifications.create({
              responsibleUserId: session.user._id,
              dbName: dbNameFromSchema(Schema),
              itemId: id,
              oldItem: prepareData(oldData),
              newItem: prepareData(data),
              status: 'update',
            })

          return res?.status(200).json({ success: true, data })
          // return { newData: data, oldData }
        } else {
          return res?.status(400).json({ success: false, error: 'No Id' })
        }
      } catch (error) {
        console.log(error)
        return res?.status(400).json({ success: false })
      }
      break
    case 'DELETE' /* Delete a model by its ID */:
      try {
        if (id) {
          data = await Schema.findById(id)
          if (!data) {
            return res?.status(400).json({ success: false })
          } else {
            oldData = data
          }
          data = await Schema.deleteOne({
            _id: id,
          })
          if (!data) {
            return res?.status(400).json({ success: false })
          }
          // Добавляем уведомление об удалении
          if (Schema === Products || Schema === Sets)
            await Notifications.create({
              responsibleUserId: session.user._id,
              dbName: dbNameFromSchema(Schema),
              itemId: id,
              oldItem: prepareData(oldData),
              newItem: null,
              status: 'delete',
            })
          return res?.status(200).json({ success: true, data })

          // return { newData: data, oldData }
        } else {
          if (params) {
            data = await Schema.deleteMany(params)
            if (!data) {
              return res?.status(400).json({ success: false })
            }
            return res?.status(200).json({ success: true, data })
            // return data
          } else {
            return res?.status(400).json({ success: false })
          }
        }
        // res?.status(200).json({ success: true, data: {} })
      } catch (error) {
        console.log(error)
        return res?.status(400).json({ success: false, error })
      }
      break
    default:
      return res?.status(400).json({ success: false })
      break
  }
}
