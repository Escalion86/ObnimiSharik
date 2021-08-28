import formProductCountObj from './formProductCountObj'

const addCountToSets = (sets, productCirculations, formated = false) => {
  const countProductCirculations = formated
    ? productCirculations
    : formProductCountObj(productCirculations)

  return sets.map((set) => {
    for (const id in set.productsIdCount) {
      if (set.productsIdCount[id] > 0) {
        // Если движений по пробукту небыло
        if (
          !(id in countProductCirculations) ||
          countProductCirculations[id] <= 0
        ) {
          count = 0
          break
        }

        const countSet = Math.floor(
          countProductCirculations[id] / set.productsIdCount[id]
        )
        if (count === null || countSet < count) count = countSet
      }
    }
    return { ...set, count }
  })
}

export default addCountToSets
