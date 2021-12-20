import TypesInCard from './forCards/TypesInCard'
import Zoom from 'react-medium-image-zoom'
import ProductsInCard from './forCards/ProductsInCard'
import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import { useSelector } from 'react-redux'
import ZoomImage from '@admincomponents/ZoomImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const SetCard = ({
  set,
  onClick = () => {},
  onTypeClick = () => {},
  onProductEditClick = null,
  onProductFilterClick = null,
  onProductBuyClick = null,
  onClone = null,
  onDelete = null,
  onEdit = null,
  multiselectMode = false,
  checked = false,
  onCheckClick = null,
}) => {
  const { setTypes } = useSelector((state) => state)

  const types = set.typesId.map((type_id) =>
    setTypes.find((typeCheck) => typeCheck._id === type_id)
  )

  if (types[0] === undefined) types.length === []

  const imageClassName = 'w-24'
  return (
    <Card
      onClick={() => onClick(set)}
      onCheckClick={onCheckClick}
      multiselectMode={multiselectMode}
      checked={checked}
    >
      {!set.showOnSite && (
        <div
          className={
            'absolute top-2 cursor-default left-0 z-10 flex justify-center items-center w-9 rounded-tl-lg rounded-br-lg text-red-400'
          }
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          <FontAwesomeIcon icon={faEyeSlash} size="lg" />
        </div>
      )}
      <CardContainer className="flex-col phoneH:flex-row">
        <ZoomImage image={set.images[0]} alt="set" />
        <div className="flex-1 ml-3">
          <div className="flex flex-col justify-between gap-x-2 tablet:flex-row">
            <div className="w-5/12 font-semibold min-w-40 ">{set.name}</div>
            <div className="flex-1 text-sm italic whitespace-pre-line min-w-40">
              {set.description}
            </div>
          </div>
          <ProductsInCard
            productsIdCount={set.productsIdCount}
            onEdit={onProductEditClick}
            onFilter={onProductFilterClick}
            onBuy={onProductBuyClick}
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
