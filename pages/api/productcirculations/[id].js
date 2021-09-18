// import dbConnect from '@utils/dbConnect'
import ProductCirculations from '@models/ProductCirculations'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(ProductCirculations, req, res)
}
