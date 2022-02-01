import { useRef } from 'react'
import Zoom from 'react-medium-image-zoom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { sendImage } from '@helpers/cloudinary'
import cn from 'classnames'

const InputImages = ({
  images = [],
  onChange = () => {},
  required = false,
  readOnly = false,
  label = null,
  directory = null,
  maxImages = 4,
  className = null,
}) => {
  const hiddenFileInput = useRef(null)
  const addImageClick = (event) => {
    hiddenFileInput.current.click()
  }

  // const handleChange = (e) => {
  //   onAddImage(e.target.files[0])
  // }

  const onAddImage = async (newImage) => {
    if (newImage) {
      // if (image) await deleteImages([image])
      sendImage(
        newImage,
        (imageUrl) => onChange([...images, imageUrl]),
        directory
      )
    } else {
      onChange(images)
    }
  }

  return (
    <div
      className={
        'flex' +
        (!readOnly || images.length > 0 ? ' flex-col' : '') +
        (className ? ' ' + className : '')
      }
    >
      {label && (
        <label
          className={cn({
            'border-b-1 border-primary max-w-min whitespace-nowrap': readOnly,
          })}
        >
          {label}
          {readOnly ? ':' : required && <span className="text-red-700">*</span>}
        </label>
      )}
      <div
        className={cn(
          'flex flex-wrap w-full gap-1 p-0.5 rounded-lg',
          { 'py-1': images.length > 0 },
          {
            [required && !images?.length
              ? 'border border-red-700'
              : 'border border-gray-400']: !readOnly,
          }
        )}
      >
        {!readOnly || images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className={cn(
                'relative h-20 overflow-hidden group border border-gray-300',
                { 'hover:border-primary': readOnly }
              )}
            >
              <Zoom zoomMargin={20}>
                <img
                  className="object-cover w-20 h-20"
                  src={image}
                  alt="item_image"
                />
              </Zoom>
              {!readOnly && (
                <FontAwesomeIcon
                  className="absolute text-red-700 duration-200 transform cursor-pointer -top-4 group-hover:top-1 -right-4 group-hover:right-1 hover:scale-125"
                  icon={faTrash}
                  size="1x"
                  onClick={() => {
                    onChange(images.filter((image, i) => i !== index))
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <div className="ml-2">-</div>
        )}
        {images.length < maxImages && !readOnly && (
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
                onChange={(e) => onAddImage(e.target.files[0])}
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
