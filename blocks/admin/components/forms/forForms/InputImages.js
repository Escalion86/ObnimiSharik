import { useRef } from 'react'
import Zoom from 'react-medium-image-zoom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

// TODO переделать сохранение самих картинок в этот компонент, аналогично InputImage компоненту
const InputImages = ({
  images = [],
  onChange = () => {},
  onAddImage = () => {},
  required = false,
  readOnly = false,
}) => {
  const hiddenFileInput = useRef(null)
  const addImageClick = (event) => {
    hiddenFileInput.current.click()
  }

  const handleChange = (e) => {
    onAddImage(e.target.files[0])
  }

  return (
    <div className="flex flex-col">
      <label
        className={
          readOnly
            ? 'border-b-1 border-primary max-w-min whitespace-nowrap'
            : ''
        }
      >
        Картинки
        {readOnly ? ':' : required && <span className="text-red-700">*</span>}
      </label>
      <div
        className={
          'flex flex-wrap w-full gap-2 px-1.5 py-1 rounded-lg ' +
          (readOnly
            ? ''
            : ' bg-gray-200 border' +
              (required && !images?.length
                ? ' border-red-700'
                : ' border-gray-700'))
        }
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={
              'relative h-20 overflow-hidden' +
              (readOnly ? ' border border-gray-400 hover:border-primary' : '')
            }
          >
            <Zoom zoomMargin={20}>
              <img className="w-20" src={image} alt="item_image" />
            </Zoom>
            {!readOnly && (
              <FontAwesomeIcon
                className="absolute top-0 right-0 text-red-700 duration-200 transform cursor-pointer hover:scale-125"
                icon={faTrash}
                size="1x"
                onClick={() => {
                  onChange(images.filter((image, i) => i !== index))
                }}
              />
            )}
          </div>
        ))}
        {images.length < 4 && !readOnly && (
          <div
            onClick={addImageClick}
            className="flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-500 cursor-pointer rounded-xl"
          >
            <div className="flex items-center justify-center w-20 duration-200 transparent hover:scale-150 ">
              <FontAwesomeIcon
                className="text-gray-700"
                icon={faPlus}
                size="2x"
                // onClick={() => {
                //   images.splice(index, 1)
                //   onChange(images)
                // }}
              />
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
                accept="image/jpeg,image/png"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InputImages
