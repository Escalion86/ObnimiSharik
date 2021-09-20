import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

const Modal = ({
  children,
  onClose = () => {},
  onDelete = null,
  twoCols = false,
}) => (
  <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen p-5 overflow-y-auto bg-gray-800 bg-opacity-80">
    <div
      className={
        'relative px-5 py-4 my-auto bg-white border-l rounded-xl border-primary min-w-100 ' +
        (twoCols ? 'w-2/3' : 'w-1/3')
      }
    >
      <FontAwesomeIcon
        className="absolute w-6 h-6 text-black duration-200 transform cursor-pointer right-4 top-4 hover:scale-110"
        icon={faTimes}
        size="1x"
        onClick={onClose}
      />
      {onDelete && (
        <FontAwesomeIcon
          className="absolute w-5 h-5 text-red-700 duration-200 transform cursor-pointer top-4 left-4 hover:scale-110"
          icon={faTrash}
          size="1x"
          onClick={onDelete}
        />
      )}
      {children}
    </div>
  </div>
)

export default Modal
