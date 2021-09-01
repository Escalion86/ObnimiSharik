import TypesInCard from './forCards/TypesInCard'
import ImageZoom from 'react-medium-image-zoom'
import ProductsInCard from './forCards/ProductsInCard'
import Card from './Card'
import CardButton from '@components/CardButton'
import {
  faPencilAlt,
  faShoppingCart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

export const SetCard = ({
  set,
  // productsWithCount,
  // count = null,
  onClick = () => {},
  onTypeClick = () => {},
  onProductClick = () => {},
  onDelete = null,
  onEdit = null,
}) => (
  <Card onClick={() => onClick(set)}>
    {set.images[0] ? (
      <ImageZoom
        image={{
          src: set.images[0],
          alt: 'set',
          className: 'w-16 h-16',
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
      <div className="flex flex-col justify-between gap-x-2 tablet:flex-row">
        <div className="w-5/12 font-semibold min-w-48 ">{set.name}</div>
        <div className="flex-1 text-sm italic min-w-48">{set.description}</div>
      </div>
      <ProductsInCard
        productsIdCount={set.productsIdCount}
        // productsWithCount={productsWithCount}
        onClick={onProductClick}
      />
      <div className="mr-12">
        <TypesInCard types={set.types} onClick={onTypeClick} />
      </div>
    </div>
    <div className="absolute top-0 right-0 flex items-center justify-end h-8 overflow-hidden border-b border-l border-gray-200 rounded-tr-lg rounded-bl-lg">
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
        {set.price / 100} ₽
      </div>
      {/* <div className="">{products.price} ₽</div> */}
    </div>
    {Object.keys(set.productsIdCount).length > 0 ? (
      <div
        className={
          'absolute bottom-0 right-0 flex items-center justify-center w-20 h-8 border-t border-l border-gray-200 rounded-tl-lg rounded-br-lg ' +
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
  </Card>
)

export default SetCard
