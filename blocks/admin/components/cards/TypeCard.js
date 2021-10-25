import {
  faPencilAlt,
  faShoppingCart,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import Card from './Card'
import CardContainer from './CardContainer'
import CardButtons from './forCards/CardButtons'

export const TypeCard = ({
  type,
  // count = null,
  onClick = () => {},
  onAdd = null,
  onDelete = null,
  onEdit = null,
}) => {
  const imageClassName = 'w-24'
  return (
    <Card onClick={() => onClick(type)}>
      <CardContainer>
        {type.image ? (
          <div onClick={(event) => event.stopPropagation()}>
            <Zoom zoomMargin={20}>
              <img className={imageClassName} src={type.image} alt="product" />
            </Zoom>
          </div>
        ) : (
          <img
            className={imageClassName}
            src="/img/no_image.png"
            alt="product"
          />
        )}
        <div className="flex-1">
          <div className="flex flex-col justify-between gap-x-2 tablet:flex-row">
            <div className="w-5/12 font-semibold min-w-40">{type.name}</div>
            <div className="flex-1 text-sm italic min-w-40">
              {type.description}
            </div>
          </div>
        </div>
      </CardContainer>
      <div className="flex flex-col items-end justify-between">
        <CardButtons
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
          topRight
        />
        <div className="px-1 font-bold text-right whitespace-nowrap min-w-min">
          {type.count} шт.
        </div>
      </div>
    </Card>
  )
}

export default TypeCard
