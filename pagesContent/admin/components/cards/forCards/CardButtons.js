import {
  faCartPlus,
  faClone,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import CardButton from './CardButton'

const CardButtons = ({
  className = null,
  onBuying = null,
  onEdit = null,
  onClone = null,
  onDelete = null,
  topRight = false,
  stretch = false,
}) => {
  return (
    <div
      className={
        'flex max-w-min items-center justify-end overflow-hidden border-l border-gray-200' +
        (topRight ? ' min-h-8 rounded-tr-lg rounded-bl-lg' : '') +
        (stretch ? ' top-0 bottom-0 rounded-r-lg ' : '') +
        (!topRight && !stretch
          ? ' laptop:h-full laptop:rounded-br-lg h-8 laptop:rounded-l-none rounded-tr-lg rounded-bl-lg '
          : '') +
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
          tooltip="Покупка"
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
          tooltip="Редактировать"
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
          tooltip="Создать копию"
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
          tooltip="Удалить"
        />
      )}
    </div>
  )
}

export default CardButtons
