import TypesInCard from './forCards/TypesInCard'
import ImageZoom from 'react-medium-image-zoom'
import ProductsInCard from './forCards/ProductsInCard'
import Card from './Card'

export const SetCard = ({
  set,
  products,
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
        products={products}
        onClick={onProductClick}
      />
      <TypesInCard types={set.types} onClick={onTypeClick} />
    </div>
    <div className="w-1/12 text-right">
      <div className="font-bold">{set.price / 100} ₽</div>
      {/* <div className="">{products.price} ₽</div> */}
    </div>
  </Card>
)

export default SetCard
