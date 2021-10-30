// import dbConnect from '@utils/dbConnect'
import Districts from '@models/Districts'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(Districts, req, res)
}
