const findDataWithId = (array, id) => {
  if (!array || !id) return null
  return array.find((data) => id === data._id)
}

export default findDataWithId
