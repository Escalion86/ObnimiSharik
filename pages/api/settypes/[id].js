import SetTypes from '@models/SetTypes'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(SetTypes, req, res)
}
