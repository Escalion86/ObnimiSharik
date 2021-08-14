import TypesInCard from './forCards/TypesInCard'
import ImageZoom from 'react-medium-image-zoom'
import Card from './Card'

export const ProductCard = ({
  product,
  count = 0,
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
    <div className="w-1/12 mb-10 text-right">
      <div className="font-bold">{product.price / 100} ₽</div>
    </div>
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
  </Card>
)

export default ProductCard
