import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAssistiveListeningSystems } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => {}, children }) => {
  return (
    <div className="absolute top-0 left-0 z-30 flex items-center justify-center w-screen h-screen bg-gray-800 bg-opacity-80">
      <div className="relative">
        <FontAwesomeIcon
          className="absolute w-10 h-10 text-black cursor-pointer right-3 top-1"
          icon={faTimes}
          size="lg"
          onClick={() => onClose()}
        />
        <div className="p-5 bg-white border-l rounded-xl border-primary w-100">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
