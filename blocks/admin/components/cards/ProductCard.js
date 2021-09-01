import TypesInCard from './forCards/TypesInCard'
import ImageZoom from 'react-medium-image-zoom'
import Card from './Card'
import {
  faPencilAlt,
  faTrash,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import CardButton from '@components/CardButton'

export const ProductCard = ({
  product,
  // count = 0,
  onClick = () => {},
  onTypeClick = () => {},
  onDelete = null,
  onEdit = null,
  onBuying = null,
}) => (
  <Card onClick={() => onClick(product)}>
    {/* <img
      className="w-14 h-14"
      src={product.images[0]}
      alt="product"
      width={56}
      height={56}
    /> */}
    {product.images[0] ? (
      <div onClick={(event) => event.stopPropagation()}>
        <ImageZoom
          image={{
            src: product.images[0],
            alt: 'product',
            className: 'w-16 h-16',
            // style: { width: '50em' }
          }}
          zoomImage={{
            src: product.images[0],
            alt: 'product',
          }}
        />
      </div>
    ) : (
      <img className="w-14 h-14" src="/img/no_image.png" alt="product" />
    )}
    <div className="flex-1 ml-3">
      <div className="flex flex-col justify-between gap-x-2 tablet:flex-row">
        <div className="w-5/12 font-semibold min-w-48">{product.name}</div>
        <div className="flex-1 text-sm italic min-w-48">
          {product.description}
        </div>
      </div>
      <div className="flex-1 text-sm">
        Артикул: <span className="italic">{product.article}</span>
      </div>
      <div className="mr-12">
        <TypesInCard types={product.types} onClick={onTypeClick} />
      </div>
    </div>
    <div className="absolute top-0 right-0 flex items-center justify-end h-8 overflow-hidden border-b border-l border-gray-200 rounded-tr-lg rounded-bl-lg">
      {onBuying && (
        <CardButton
          onClick={(event) => {
            event.stopPropagation()
            onBuying()
          }}
          className="bg-yellow-400"
          inverse
          icon={faShoppingCart}
        />
      )}
      {onEdit && (
        <CardButton
          onClick={(event) => {
            event.stopPropagation()
            onEdit()
          }}
          className="bg-primary"
          inverse
          icon={faPencilAlt}
        />
      )}
      {onDelete && (
        <CardButton
          onClick={(event) => {
            event.stopPropagation()
            onDelete()
          }}
          className="bg-red-400"
          inverse
          icon={faTrash}
        />
      )}
    </div>
    <div className="w-24 my-10 text-right min-w-min">
      <div className="font-bold whitespace-nowrap min-w-min">
        {product.price / 100} ₽
      </div>
    </div>
    <div
      className={
        'absolute bottom-0 right-0 flex items-center justify-center w-20 h-8 border-t border-l border-gray-200 rounded-tl-lg rounded-br-lg ' +
        (product.count > 3
          ? 'bg-green-400'
          : product.count > 0
          ? 'bg-green-200'
          : product.count < 0
          ? 'bg-red-400'
          : 'bg-red-200')
      }
    >
      <span>
        <span>{product.count ? product.count : 0}</span>
        <span className="text-sm"> шт.</span>
      </span>
    </div>
  </Card>
)

export default ProductCard
