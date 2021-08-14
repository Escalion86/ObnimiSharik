import TypesInCard from './forCards/TypesInCard'
import ImageZoom from 'react-medium-image-zoom'
import ProductsInCard from './forCards/ProductsInCard'
import Card from './Card'

export const SetCard = ({
  set,
  productsWithCount,
  count = null,
  onClick = () => {},
  onTypeClick = () => {},
  onProductClick = () => {},
  onDelete = null,
}) => (
  <Card>
    {set.images[0] ? (
      <ImageZoom
        image={{
          src: set.images[0],
          alt: 'set',
          className: 'w-14 h-14',
          // style: { width: '50em' }
        }}
        zoomImage={{
          src: set.images[0],
          alt: 'set',
        }}
      />
    ) : (
      <img className="w-14 h-14" src="/img/no_image.png" alt="set" />
    )}
    <div className="flex-1 ml-3">
      <div className="flex justify-between space-x-2">
        <div
          className="w-3/12 font-semibold cursor-pointer text-primary hover:text-toxic"
          onClick={() => onClick(set)}
        >
          {set.name}
        </div>
        <div className="flex-1 text-sm italic">{set.description}</div>
      </div>
      <ProductsInCard
        productsIdCount={set.productsIdCount}
        productsWithCount={productsWithCount}
        onClick={onProductClick}
      />
      <TypesInCard types={set.types} onClick={onTypeClick} />
    </div>
    <div className="w-1/12 mb-10 text-right ">
      <div className="font-bold">{set.price / 100} ₽</div>
      {/* <div className="">{products.price} ₽</div> */}
    </div>
    {set.productsIdCount.length > 0 ? (
      <div
        className={
          'absolute bottom-0 right-0 flex items-center justify-center w-24 h-10 border-t border-l border-gray-300 rounded-tl-lg rounded-br-lg ' +
          (count > 3
            ? 'bg-green-400'
            : count > 0
            ? 'bg-green-200'
            : count < 0
            ? 'bg-red-400'
            : 'bg-red-200')
        }
      >
        <span>
          <span>{count}</span>
          <span className="text-sm"> шт.</span>
        </span>
      </div>
    ) : (
      <div className="absolute bottom-0 right-0 flex items-center justify-center w-24 h-10 bg-gray-200 border-t border-l border-gray-300 rounded-tl-lg rounded-br-lg">
        <span className="text-sm text-gray-600">Набор пуст</span>
      </div>
    )}
  </Card>
)

export default SetCard
