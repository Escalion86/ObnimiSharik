// import { useSelector } from 'react-redux'
import formProductCountObj from './formProductCountObj'

const addCountToSets = (sets, productCirculations = null, formated = false) => {
  // const state = useSelector((state) => state)
  if (!sets) return
  // sets = useSelector((state) => state.sets)

  let countProductCirculations
  if (!productCirculations)
    // countProductCirculations = formProductCountObj(
    //   useSelector((state) => state.productCirculations)
    // )
    return sets
  else
    countProductCirculations = formated
      ? productCirculations
      : formProductCountObj(productCirculations)

  return sets.map((set) => {
    let count = null
    // for (const [id, count] of Object.entries(set.productsIdCount)) {
    //   if (id !== '?' && count > 0) productsIdCount[id] = count
    // }

    for (const [id, value] of Object.entries(set.productsIdCount)) {
      if (value > 0) {
        // Если движений по пробукту небыло
        if (
          id in countProductCirculations &&
          countProductCirculations[id] > 0
        ) {
          const countSet = Math.floor(countProductCirculations[id] / value)
          if (count === null || countSet < count) count = countSet
        }

        if (count === null || count <= 0) break
      }
    }

    return count ? { ...set, count } : { ...set, count: 0 }
  })
}

export default addCountToSets
