// import dbConnect from '@utils/dbConnect'
import Products from '@models/Products'
import CRUD from '@server/CRUD'

export default async function handler(req, res) {
  return await CRUD(Products, req, res)
}
