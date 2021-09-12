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
}) => (
  <Card inLine onClick={() => onClick(type)}>
    <CardContainer>
      <div className="flex-1">
        <div className="flex justify-between gap-x-2">
          <div className="font-semibold">{type.name}</div>
          {/* <div className="flex-1 italic">{type.description}</div> */}
        </div>
      </div>
      <div className="w-20 text-right">
        <span>
          <span>{type.count}</span>
          <span className="text-sm"> шт.</span>
        </span>
        {/* <div className="font-bold">{count !== null ? count : '0'} шт.</div> */}
        {/* <div className="">{products.price} ₽</div> */}
      </div>
    </CardContainer>
    <CardButtons onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
  </Card>
)

export default TypeCard
