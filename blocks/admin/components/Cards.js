import TypesInCard from '@admincomponents/TypesInCard'
import ImageZoom from 'react-medium-image-zoom'

const Card = ({ children }) => (
  <div className="flex items-center p-2 mx-1 my-2 bg-white rounded-lg shadow-medium ">
    {children}
  </div>
)

export const SetCard = ({
  set,
  onClick = () => {},
  onTypeClick = () => {},
}) => (
  <div className="flex items-center p-2 mx-1 my-2 bg-white rounded-lg shadow-medium">
    {set.image_urls[0] ? (
      <ImageZoom
        image={{
          src: set.image_urls[0],
          alt: 'set',
          className: 'w-14 h-14',
          // style: { width: '50em' }
        }}
        zoomImage={{
          src: set.image_urls[0],
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
      <TypesInCard types={set.types} onClick={onTypeClick} />
    </div>
    <div className="w-1/12 text-right">
      <div className="font-bold">{set.price / 100} ₽</div>
      {/* <div className="">{products.price} ₽</div> */}
    </div>
  </div>
)

export const ProductCard = ({
  product,
  onClick = () => {},
  onTypeClick = () => {},
}) => (
  <div className="flex items-center p-2 mx-1 my-2 bg-white rounded-lg shadow-medium">
    {/* <img
      className="w-14 h-14"
      src={product.image_urls[0]}
      alt="product"
      width={56}
      height={56}
    /> */}
    {product.image_urls[0] ? (
      <ImageZoom
        image={{
          src: product.image_urls[0],
          alt: 'product',
          className: 'w-14 h-14',
          // style: { width: '50em' }
        }}
        zoomImage={{
          src: product.image_urls[0],
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
  </div>
)

export const TypeCard = ({ type }) => (
  <div className="flex items-center p-2 mx-1 my-2 bg-white shadow-md">
    <div className="flex-1 ml-3">
      <div className="flex justify-between space-x-2">
        <div className="w-3/12 font-semibold cursor-pointer text-primary hover:text-toxic">
          {type.name}
        </div>
        {/* <div className="flex-1 italic">{type.description}</div> */}
      </div>
    </div>
  </div>
)

export default Card
