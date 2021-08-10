import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => {}, children, onDelete = null }) => (
  <div className="absolute top-0 left-0 z-30 flex items-center justify-center w-screen h-screen p-5 bg-gray-800 bg-opacity-80">
    <div className="relative px-5 py-4 my-auto bg-white border-l rounded-xl border-primary w-100">
      <FontAwesomeIcon
        className="absolute w-10 h-10 text-black duration-200 transform cursor-pointer right-4 top-1 hover:scale-110"
        icon={faTimes}
        size="lg"
        onClick={() => onClose()}
      />
      {onDelete ? (
        <FontAwesomeIcon
          className="absolute w-10 h-10 text-red-700 duration-200 transform cursor-pointer top-1 left-4 hover:scale-110"
          icon={faTrash}
          size="1x"
          onClick={() => onDelete()}
        />
      ) : null}
      {children}
    </div>
  </div>
)

export default Modal
