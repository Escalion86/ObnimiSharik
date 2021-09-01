const compareObjects = (object1, object2) => {
  for (const key in object1) {
    // && Array.isArray(object1[key])
    if (typeof object1[key] === 'object') {
      if (!compareObjects(object1[key], object2[key])) return false
    } else {
      if (object1[key] !== object2[key]) return false
    }
  }
  return true
}

export default compareObjects
