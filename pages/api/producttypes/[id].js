import ProductTypes from '@models/ProductTypes'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(ProductTypes, req, res)
}
