import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPencilAlt,
  faPlus,
  faQuestion,
  faShoppingCart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import CardButton from './CardButton'

const CardButtons = ({
  className = null,
  onBuying = null,
  onAdd = null,
  onEdit = null,
  onDelete = null,
  topRight = false,
}) => (
  <div
    className={
      'flex items-center justify-end overflow-hidden border-l border-gray-200' +
      (topRight
        ? ' absolute top-0 right-0 h-8 rounded-tr-lg rounded-bl-lg'
        : ' h-full rounded-r-lg') +
      (className ? ' ' + className : '')
    }
  >
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
)

export default CardButtons
