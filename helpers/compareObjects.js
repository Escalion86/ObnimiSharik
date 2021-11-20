// const compareObjects = (object1, object2) => {
//   console.log(`object1`, object1)
//   console.log(`object2`, object2)

//   for (const key in object1) {
//     // && Array.isArray(object1[key])
//     if (typeof object1[key] === 'object') {
//       if (Array.isArray(object1[key])) {

//       } else if (!compareObjects(object1[key], object2[key])) return false
//     } else {
//       if (object1[key] !== object2[key]) return false
//     }
//   }
//   return true
// }

// const compareObjects = (a, b) => {
//   // if (Array.isArray(object1[key]))
//   if (a.length !== b.length) return false
//   const uniqueValues = new Set([...a, ...b])
//   for (const v of uniqueValues) {
//     const aCount = a.filter((e) => e === v).length
//     const bCount = b.filter((e) => e === v).length
//     if (aCount !== bCount) return false
//   }
//   return true
// }

const compareObjects = (a, b, oneWay = false) => {
  if (oneWay) {
    const newB = {}
    for (const [key, value] of Object.entries(a)) {
      if (!(key in b)) return false
      newB[key] = b[key]
    }
    return JSON.stringify(a) === JSON.stringify(newB)
  } else return JSON.stringify(a) === JSON.stringify(b)
}

export default compareObjects
