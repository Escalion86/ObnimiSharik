const keys = ['_id', 'createdAt', 'updatedAt']

const prepareFetchProps = (fetchResult) => {
  // const props = fetchResult.map((doc) => {
  //   const docObj = doc.toObject()
  //   keys.forEach((key) => {
  //     if (key in docObj) docObj[key] = docObj[key].toString()
  //   })
  //   return docObj
  // })
  // return props
  return JSON.parse(JSON.stringify(fetchResult))
}

export default prepareFetchProps
