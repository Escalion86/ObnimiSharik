import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartPlus,
  faClone,
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
  onClone = null,
  onDelete = null,
  topRight = false,
}) => (
  <div
    className={
      'flex items-center justify-end overflow-hidden border-l border-gray-200' +
      (topRight ? ' h-8 rounded-tr-lg rounded-bl-lg' : ' h-full rounded-r-lg') +
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
        icon={faCartPlus}
      />
    )}
    {onAdd && (
      <CardButton
        onClick={(event) => {
          event.stopPropagation()
          onAdd()
        }}
        className="bg-green-400"
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
    {onClone && (
      <CardButton
        onClick={(event) => {
          event.stopPropagation()
          onClone()
        }}
        className="bg-purple-400"
        inverse
        icon={faClone}
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
