import { useRef } from 'react'
import Zoom from 'react-medium-image-zoom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { deleteImages, sendImage } from '@helpers/cloudinary'
import cn from 'classnames'

const InputImage = ({
  label = 'Картинка',
  image = null,
  noImage = null,
  onChange = () => {},
  required = false,
  readOnly = false,
  noEditButton = false,
  inLine = false,
  directory = null,
  imageName = null,
}) => {
  const hiddenFileInput = useRef(null)
  const selectImageClick = (event) => {
    hiddenFileInput.current.click()
  }

  const onChangeImage = async (newImage) => {
    if (newImage) {
      if (image) await deleteImages([image])
      sendImage(
        newImage,
        (imageUrl) => onChange(imageUrl),
        directory,
        imageName
      )
    } else {
      if (imageName)
        await deleteImages([(directory ? directory + '/' : '') + imageName])
      onChange(null)
    }
  }
  if (readOnly && !image) return null

  return (
    <div className={inLine ? 'flex' : ''}>
      {label && (
        <label
          className={cn(
            {
              'border-b-1 border-primary max-w-min whitespace-nowrap': readOnly,
            },
            { 'min-w-24 max-w-40 w-1/4': inLine }
          )}
        >
          {label}
          {readOnly ? ':' : required && <span className="text-red-700">*</span>}
        </label>
      )}
      {!image && readOnly ? (
        <div className="ml-2">-</div>
      ) : (
        <div
          className={cn(
            'relative border rounded-lg h-20 w-20 overflow-hidden group',
            { 'border-gray-400 hover:border-primary': readOnly },
            {
              [required && !image ? ' border-red-700' : ' border-gray-400']:
                !readOnly,
            }
          )}
        >
          {image ? (
            <Zoom zoomMargin={20}>
              <img
                className="object-cover w-20 h-20"
                src={image}
                alt="item_image"
              />
            </Zoom>
          ) : (
            <img
              className="object-cover w-20 h-20"
              src={noImage}
              alt="item_no_image"
            />
          )}
          {!readOnly && image && (
            <FontAwesomeIcon
              className="absolute text-red-700 duration-200 transform cursor-pointer -top-4 group-hover:top-1 -right-4 group-hover:right-1 hover:scale-125"
              icon={faTrash}
              size="1x"
              onClick={() => {
                onChangeImage(null)
              }}
            />
          )}
          {!readOnly && !image && (
            <FontAwesomeIcon
              className="absolute duration-200 transform opacity-0 cursor-pointer text-primary top-6 right-6 group-hover:opacity-80 group-hover:scale-125"
              icon={faPencilAlt}
              size="2x"
              onClick={() => selectImageClick()}
            />
          )}
          {!readOnly && !noEditButton && image && (
            <FontAwesomeIcon
              className="absolute duration-200 transform cursor-pointer -top-4 -left-4 group-hover:top-1 group-hover:left-1 text-primary hover:scale-125"
              icon={faPencilAlt}
              size="1x"
              onClick={() => {
                // onChange(addImageClick)
                selectImageClick()
              }}
            />
          )}
        </div>
      )}
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={(e) => onChangeImage(e.target.files[0])}
        style={{ display: 'none' }}
        accept="image/jpeg,image/png"
      />
      {/* {!readOnly && (
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
        )} */}
    </div>
  )
}

export default InputImage
