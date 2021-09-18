// import dbConnect from '@utils/dbConnect'
import Orders from '@models/Orders'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(Orders, req, res)
}
