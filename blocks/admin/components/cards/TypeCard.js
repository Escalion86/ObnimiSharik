import CardButton from '@components/CardButton'
import {
  faPencilAlt,
  faShoppingCart,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import Card from './Card'

export const TypeCard = ({
  type,
  count = null,
  onClick = () => {},
  onAdd = null,
  onDelete = null,
  onEdit = null,
}) => (
  <Card onClick={() => onClick(type)}>
    <div className="flex-1">
      <div className="flex justify-between gap-x-2">
        <div className="font-semibold">{type.name}</div>
        {/* <div className="flex-1 italic">{type.description}</div> */}
      </div>
    </div>
    <div className="w-20 mr-24 text-right">
      <span>
        <span>{count}</span>
        <span className="text-sm"> шт.</span>
      </span>
      {/* <div className="font-bold">{count !== null ? count : '0'} шт.</div> */}
      {/* <div className="">{products.price} ₽</div> */}
    </div>
    <div className="absolute top-0 bottom-0 right-0 flex items-center justify-end h-8 overflow-hidden border-b border-l border-gray-200 rounded-tr-lg rounded-bl-lg">
      {onAdd && (
        <CardButton
          onClick={(event) => {
            event.stopPropagation()
            onAdd()
          }}
          className="bg-yellow-400"
          inverse
          icon={faPlus}
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
  </Card>
)

export default TypeCard
