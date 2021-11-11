import Sets from '@models/Sets'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(Sets, req, res)
}
