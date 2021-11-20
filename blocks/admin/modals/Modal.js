import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPencilAlt,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { cloneElement, useEffect, useState } from 'react'

const Modal = ({
  children,
  onClose = () => {},
  onDelete = null,
  twoCols = false,
  noPropsToChildren = false,
  editMode = null,
  setEditMode = null,
  subModalText = null,
  modals = null,
}) => {
  const [rendered, setRendered] = useState(false)
  const [formChanged, setFormChanged] = useState(false)

  const closeFunc = () => {
    setRendered(false)
    setTimeout(() => {
      onClose()
    }, 200)
  }
  const onCloseWithDelay = () => {
    if (formChanged && modals) {
      modals.openConfirmModal(
        'Отмена изменений',
        'Вы уверены что хотите закрыть окно без сохранения изменений?',
        closeFunc
      )
    } else closeFunc()
  }

  useEffect(() => {
    setTimeout(() => {
      setRendered(true)
    }, 10)
  }, [])

  return (
    <div
      className={
        'absolute transform duration-200 top-0 left-0 z-50 flex bg-opacity-80 items-center justify-center w-screen h-screen overflow-y-auto bg-gray-800' +
        (subModalText ? ' pt-10 pb-5' : ' p-5') +
        (rendered ? ' opacity-100' : ' opacity-0')
      }
      onMouseDown={onCloseWithDelay}
    >
      <div
        className={
          'relative min-w-84 max-w-132 w-9/12 tablet:min-w-116 px-4 py-4 duration-300 my-auto bg-white border-l rounded-xl border-primary ' +
          (twoCols ? ' laptop:w-9/12 laptop:min-w-228 laptop:max-w-248' : ' ') +
          (rendered ? '' : ' scale-50')
        }
        onClick={(e) => e?.stopPropagation()}
        onMouseDown={(e) => e?.stopPropagation()}
      >
        {subModalText && (
          <div className="absolute left-0 flex justify-center w-full -top-9">
            <div className="px-2 py-0.5 bg-white rounded-md">
              {subModalText}
            </div>
          </div>
        )}
        <FontAwesomeIcon
          className="absolute w-6 h-6 text-black duration-200 transform cursor-pointer right-4 top-4 hover:scale-110"
          icon={faTimes}
          size="1x"
          onClick={onCloseWithDelay}
        />
        {editMode && onDelete && (
          <FontAwesomeIcon
            className="absolute w-5 h-5 text-red-700 duration-200 transform cursor-pointer top-4 left-4 hover:scale-110"
            icon={faTrash}
            size="1x"
            onClick={() => {
              onDelete(onCloseWithDelay)
            }}
          />
        )}
        {!editMode && editMode !== null && (
          <FontAwesomeIcon
            className="absolute w-5 h-5 duration-200 transform cursor-pointer text-primary top-4 left-4 hover:scale-110"
            icon={faPencilAlt}
            size="1x"
            onClick={
              setEditMode
                ? () => {
                    setEditMode(true)
                  }
                : null
            }
          />
        )}
        {noPropsToChildren
          ? children
          : cloneElement(children, { onClose: closeFunc, setFormChanged })}
      </div>
    </div>
  )
}

export default Modal
