import TypesInCard from './forCards/TypesInCard'
import Zoom from 'react-medium-image-zoom'
import ProductsInCard from './forCards/ProductsInCard'
import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import { useSelector } from 'react-redux'

export const SetCard = ({
  set,
  // productsWithCount,
  // count = null,
  onClick = () => {},
  onTypeClick = () => {},
  onProductClick = () => {},
  onClone = null,
  onDelete = null,
  onEdit = null,
}) => {
  const { setTypes } = useSelector((state) => state)

  const types = set.typesId.map((type_id) =>
    setTypes.find((typeCheck) => typeCheck._id === type_id)
  )

  if (types[0] === undefined) types.length === []

  const imageClassName = 'w-20 h-20'
  return (
    <Card onClick={() => onClick(set)}>
      <CardContainer>
        {set.images[0] ? (
          <div onClick={(event) => event.stopPropagation()}>
            {/* <ImageZoom
              image={{
                src: set.images[0],
                alt: 'set',
                className: imageClassName,
                // style: { width: '50em' }
              }}
              zoomImage={{
                src: set.images[0],
                alt: 'set',
              }}
            />
            <ImageZoom> */}
            <Zoom zoomMargin={20}>
              <img className="w-24" src={set.images[0]} alt="set" />
            </Zoom>
          </div>
        ) : (
          <img className={imageClassName} src="/img/no_image.png" alt="set" />
        )}
        <div className="flex-1 ml-3">
          <div className="flex flex-col justify-between gap-x-2 tablet:flex-row">
            <div className="w-5/12 font-semibold min-w-40 ">{set.name}</div>
            <div className="flex-1 text-sm italic min-w-40">
              {set.description}
            </div>
          </div>
          <ProductsInCard
            productsIdCount={set.productsIdCount}
            // productsWithCount={productsWithCount}
            onClick={onProductClick}
          />
          <div className="mr-12">
            <TypesInCard types={types} onClick={onTypeClick} />
          </div>
        </div>
      </CardContainer>
      <div className="flex flex-col items-end justify-between">
        <CardButtons
          topRight
          onEdit={onEdit}
          onClone={onClone}
          onDelete={onDelete}
        />
        <div className="px-1 font-bold text-right whitespace-nowrap min-w-min">
          {set.price / 100} ₽
        </div>
        {Object.keys(set.productsIdCount).length > 0 ? (
          <div
            className={
              'flex items-center justify-center w-20 h-8 border-t border-l border-gray-200 rounded-tl-lg rounded-br-lg ' +
              (set.count > 3
                ? 'bg-green-400'
                : set.count > 0
                ? 'bg-green-200'
                : set.count < 0
                ? 'bg-red-400'
                : 'bg-red-200')
            }
          >
            <span>
              <span>{set.count ? set.count : 0}</span>
              <span className="text-sm"> шт.</span>
            </span>
          </div>
        ) : (
          <div className="absolute bottom-0 right-0 flex items-center justify-center w-20 h-10 bg-gray-200 border-t border-l border-gray-200 rounded-tl-lg rounded-br-lg">
            <span className="text-sm text-gray-600">Набор пуст</span>
          </div>
        )}
      </div>
    </Card>
  )
}

export default SetCard
