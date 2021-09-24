import TypesInCard from './forCards/TypesInCard'
import Zoom from 'react-medium-image-zoom'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import { useSelector } from 'react-redux'

export const ProductCard = ({
  product,
  onClick = () => {},
  onTypeClick = () => {},
  onClone = null,
  onDelete = null,
  onEdit = null,
  onBuying = null,
}) => {
  const { productTypes } = useSelector((state) => state)
  const types = product.typesId.map((type_id) =>
    productTypes.find((typeCheck) => typeCheck._id === type_id)
  )

  if (types[0] === undefined) types.length === []

  const imageClassName = 'w-24'

  return (
    <Card onClick={() => onClick(product)}>
      {/* <img
      className="w-14 h-14"
      src={product.images[0]}
      alt="product"
      width={56}
      height={56}
    /> */}
      <CardContainer className="flex-col phoneH:flex-row">
        {product.images[0] ? (
          <div onClick={(event) => event.stopPropagation()}>
            {/* <ImageZoom
              image={{
                src: product.images[0],
                alt: 'product',
                className: imageClassName,
                // style: { width: '50em' }
              }}
              zoomImage={{
                src: product.images[0],
                alt: 'product',
              }}
            /> */}
            <Zoom zoomMargin={20}>
              <img
                className={imageClassName}
                src={product.images[0]}
                alt="product"
              />
              {/* <div className="border border-gray-700">Привет</div> */}
            </Zoom>
          </div>
        ) : (
          <img
            className={imageClassName}
            src="/img/no_image.png"
            alt="product"
          />
        )}
        <div className="flex-1 ml-3">
          <div className="flex flex-col justify-between gap-x-2 tablet:flex-row">
            <div className="w-5/12 font-semibold min-w-40">{product.name}</div>
            <div className="flex-1 text-sm italic min-w-40">
              {product.description}
            </div>
          </div>
          <div className="flex-1 text-sm">
            Артикул: <span className="italic">{product.article}</span>
          </div>
          <div className="mr-12">
            <TypesInCard types={types} onClick={onTypeClick} />
          </div>
        </div>
      </CardContainer>
      <div className="flex flex-col items-end justify-between">
        <CardButtons
          topRight
          onBuying={onBuying}
          onEdit={onEdit}
          onDelete={onDelete}
          onClone={onClone}
        />
        <div className="px-1 font-bold text-right whitespace-nowrap min-w-min">
          {product.price / 100} ₽
        </div>
        <div
          className={
            'flex items-center justify-center w-20 h-8 border-t border-l border-gray-200 rounded-tl-lg rounded-br-lg ' +
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
      </div>
    </Card>
  )
}

export default ProductCard
