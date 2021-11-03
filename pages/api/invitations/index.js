import Invitations from '@models/Invitations'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(Invitations, req, res)
}
