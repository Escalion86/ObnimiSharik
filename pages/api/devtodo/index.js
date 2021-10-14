import DevToDo from '@models/DevToDo'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(DevToDo, req, res)
}
