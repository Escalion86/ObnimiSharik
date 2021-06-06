import Title from './Title'
import Card from './Card'
import { v4 as uuid } from 'uuid'
// import useWindowDimensions from '../helpers/useWindowDimensions'
// import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
// import MasonryLayout from 'react-masonry-layout'
// import AutoResponsive from 'autoresponsive-react'
// import Packery from 'react-packery-component'
// import { Responsive as GridLayout } from 'react-grid-layout'

const BlockOfCards = ({ data, title }) => {
  // const { height, width } = useWindowDimensions()
  const width = 1200
  const haveSmall = !!data.find((card) => card.size === 'small')
  // console.log(`haveSmall`, haveSmall)
  // const smallCards = data.filter((card) => card.size ==='small')
  // const normalCards = data.filter((card) => card.size ==='normal')
  // const bigCards = data.filter((card) => card.size ==='big')

  const Masonry = ({ data }) => {
    // const formGrids = (data) => {
    const gridsCount = Math.floor(width / 400)
    const resGrids = []
    const resGridSizes = []

    for (let i = 0; i < gridsCount; i++) {
      resGrids.push([])
      resGridSizes.push(0)
    }
    const smallestGridIndex = () => {
      let index = 0
      for (let i = 1; i < gridsCount; i++) {
        if (resGridSizes[i] < resGridSizes[index]) {
          index = i
        }
      }
      return index
    }

    data.forEach((card) => {
      const index = smallestGridIndex()
      resGrids[index].push(card)
      resGridSizes[index] += card.size === 'normal' ? 1 : 2
    })

    // return resGrids
    // }
    return (
      <div className="flex justify-around">
        {/* <div className="grid w-full grid-cols-3"> */}
        {resGrids.map((grid) => (
          <div key={'grid' + uuid()}>
            {grid.map((card) => {
              return (
                <Card
                  key={'card' + uuid()}
                  title={card.title}
                  desc={card.desc}
                  href={card.href}
                  src={card.src}
                  small={card.size === 'small'}
                  big={card.size === 'big'}
                  active={card.active}
                />
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-8">
      <Title title={title} />

      {haveSmall ? (
        <div className="flex flex-wrap justify-between">
          {data.map((card) => (
            <Card
              key={'card' + uuid()}
              title={card.title}
              desc={card.desc}
              href={card.href}
              src={card.src}
              small={card.size === 'small'}
              big={card.size === 'big'}
            />
          ))}
        </div>
      ) : (
        <Masonry data={data} />
      )}
    </div>
  )
}

export default BlockOfCards
