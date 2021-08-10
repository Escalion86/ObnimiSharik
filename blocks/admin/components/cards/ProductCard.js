import TypesInCard from './forCards/TypesInCard'
import ImageZoom from 'react-medium-image-zoom'
import Card from './Card'

export const ProductCard = ({
  product,
  onClick = () => {},
  onTypeClick = () => {},
  onDelete = null,
}) => (
  <Card>
    {/* <img
      className="w-14 h-14"
      src={product.images[0]}
      alt="product"
      width={56}
      height={56}
    /> */}
    {product.images[0] ? (
      <ImageZoom
        image={{
          src: product.images[0],
          alt: 'product',
          className: 'w-14 h-14',
          // style: { width: '50em' }
        }}
        zoomImage={{
          src: product.images[0],
          alt: 'product',
        }}
      />
    ) : (
      <img className="w-14 h-14" src="/img/no_image.png" alt="product" />
    )}
    <div className="flex-1 ml-3">
      <div className="flex justify-between space-x-2">
        <div
          className="w-3/12 font-semibold cursor-pointer text-primary hover:text-toxic"
          onClick={() => onClick(product)}
        >
          {product.name}
        </div>
        <div className="flex-1 text-sm italic">{product.description}</div>
      </div>
      <TypesInCard types={product.types} onClick={onTypeClick} />
    </div>
    <div className="w-1/12 text-right">
      <div className="font-bold">{product.price / 100} ₽</div>
      {/* <div className="">{products.price} ₽</div> */}
    </div>
  </Card>
)

export default ProductCard
