import Clients from '@models/Clients'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(Clients, req, res)
}
