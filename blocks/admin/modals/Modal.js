import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => {}, children, onDelete = null }) => {
  console.log(`onDelete`, onDelete)
  return (
    <div className="absolute top-0 left-0 z-30 flex items-center justify-center w-screen h-screen bg-gray-800 bg-opacity-80">
      <div className="relative">
        <FontAwesomeIcon
          className="absolute w-10 h-10 text-black duration-200 transform cursor-pointer right-3 top-1 hover:scale-110"
          icon={faTimes}
          size="lg"
          onClick={() => onClose()}
        />
        {onDelete ? (
          <FontAwesomeIcon
            className="absolute w-10 h-10 text-red-700 duration-200 transform cursor-pointer top-1 left-3 hover:scale-110"
            icon={faTrash}
            size="1x"
            onClick={() => onDelete()}
          />
        ) : null}
        <div className="p-5 bg-white border-l rounded-xl border-primary w-100">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
