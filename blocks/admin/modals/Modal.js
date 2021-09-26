import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { cloneElement, useEffect, useState } from 'react'

const Modal = ({
  children,
  onClose = () => {},
  onDelete = null,
  twoCols = false,
}) => {
  const [rendered, setRendered] = useState(false)
  const onCloseWithDelay = () => {
    setRendered(false)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  useEffect(() => {
    setTimeout(() => {
      setRendered(true)
    }, 10)
  }, [])

  return (
    <div
      className={
        'absolute transform duration-200 top-0 left-0 z-50 flex bg-opacity-80 items-center justify-center w-screen h-screen p-5 overflow-y-auto bg-gray-800' +
        (rendered ? ' opacity-100' : ' opacity-0')
      }
    >
      <div
        className={
          'relative min-w-84 max-w-132 w-9/12 tablet:min-w-116 px-4 py-4 duration-300 my-auto bg-white border-l rounded-xl border-primary ' +
          (twoCols
            ? ' laptop:w-9/12 laptop:min-w-228 laptop:max-w-248'
            : ' laptop:max-w-none') +
          (rendered ? '' : ' scale-50')
        }
      >
        <FontAwesomeIcon
          className="absolute w-6 h-6 text-black duration-200 transform cursor-pointer right-4 top-4 hover:scale-110"
          icon={faTimes}
          size="1x"
          onClick={onCloseWithDelay}
        />
        {onDelete && (
          <FontAwesomeIcon
            className="absolute w-5 h-5 text-red-700 duration-200 transform cursor-pointer top-4 left-4 hover:scale-110"
            icon={faTrash}
            size="1x"
            onClick={() => {
              onDelete(onCloseWithDelay)
            }}
          />
        )}
        {cloneElement(children, { onClose: onCloseWithDelay })}
      </div>
    </div>
  )
}

export default Modal
