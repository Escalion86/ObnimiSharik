const addCountToSetTypes = (setTypes, sets) =>
  setTypes.map((setType) => {
    return {
      ...setType,
      count: sets.filter((set) => set.typesId.includes(setType._id)).length,
    }
  })

export default addCountToSetTypes
