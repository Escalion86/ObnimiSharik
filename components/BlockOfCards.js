import Title from './Title'
import Card from './Card'
import { v4 as uuid } from 'uuid'
import useWindowDimensions from '../helpers/useWindowDimensions'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
// import MasonryLayout from 'react-masonry-layout'
// import AutoResponsive from 'autoresponsive-react'
// import Packery from 'react-packery-component'
// import { Responsive as GridLayout } from 'react-grid-layout'

const MasonryNoSmall = ({ data, width }) => {
  // const formGrids = (data) => {
  const colsCount = Math.floor(width / 400)

  if (colsCount > 0) {
    const resCols = []
    const resColsSizes = []
    for (let i = 0; i < colsCount; i++) {
      resCols.push([])
      resColsSizes.push(0)
    }
    const smallestColIndex = () => {
      let index = 0
      for (let i = 1; i < colsCount; i++) {
        if (resColsSizes[i] < resColsSizes[index]) {
          index = i
        }
      }
      return index
    }

    data.forEach((card) => {
      const index = smallestColIndex()
      resCols[index].push(card)
      resColsSizes[index] += card.size === 'normal' ? 1 : 2
    })

    return (
      <div className="flex justify-center space-x-6">
        {/* <div className="grid w-full grid-cols-3"> */}
        {resCols.map((col) => (
          <div key={'col' + uuid()}>
            {col.map((card) => (
              <Card key={'card' + uuid()} card={card} />
            ))}
          </div>
        ))}
      </div>
    )
  }
  return null
}

const MasonryNoBig = ({ data, width }) => {
  let rowMaxLength = Math.floor(width / 200)

  if (rowMaxLength > 0) {
    const smallCards = data.filter((card) => card.size === 'small')
    const normalCards = data.filter((card) => card.size === 'normal')
    if (rowMaxLength > 3) {
      const ostatok = smallCards.length + normalCards.length * 2
      if (ostatok % rowMaxLength === 1 || ostatok % rowMaxLength === 2) {
        rowMaxLength = 3
      }
    }
    let rows = []
    let rowIndex = -1

    while (normalCards.length > 0 || smallCards.length > 0) {
      rowIndex += 1
      let rowLength = 0
      rows[rowIndex] = []
      while (
        (normalCards.length > 0 && rowMaxLength - rowLength >= 2) ||
        (smallCards.length > 0 && rowMaxLength - rowLength >= 1)
      ) {
        if (normalCards.length > 0 && rowMaxLength - rowLength >= 2) {
          let card = normalCards.shift()
          rows[rowIndex].push(card)
          rowLength += 2
        }
        if (smallCards.length > 0 && rowMaxLength - rowLength >= 1) {
          let card = smallCards.shift()
          rows[rowIndex].push(card)
          rowLength += 1
        }
      }
    }

    return (
      <div className="flex flex-col">
        {rows.map((row) => (
          <div key={'row' + uuid()} className="flex justify-center space-x-6">
            {row.map((card) => (
              <Card key={'card' + uuid()} card={card} />
            ))}
          </div>
        ))}
      </div>
    )
  }
  return null
}

const Masonry = ({ data, width }) => {
  const haveSmall = !!data.find((card) => card.size === 'small')
  if (haveSmall) {
    return <MasonryNoBig data={data} width={width} />
  } else {
    return <MasonryNoSmall data={data} width={width} />
  }
}

const BlockOfCards = ({ data, title, className = '' }) => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // console.log(`haveSmall`, haveSmall)
  // const smallCards = data.filter((card) => card.size ==='small')
  // const normalCards = data.filter((card) => card.size ==='normal')
  // const bigCards = data.filter((card) => card.size ==='big')

  // if (!width) return null
  return (
    <div className={'mt-32' + (className ? ' ' + className : '')}>
      <Title title={title} />
      <Masonry data={data} width={windowWidth} />
    </div>
  )
}

export default BlockOfCards
