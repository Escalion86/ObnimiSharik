const keys = ['_id', 'created_at', 'updated_at']

const prepareFetchProps = (fetchResult) => {
  const props = fetchResult.map((doc) => {
    const docObj = doc.toObject()
    keys.forEach((key) => {
      if (key in docObj) docObj[key] = docObj[key].toString()
    })
    return docObj
  })
  return props
}

export default prepareFetchProps
