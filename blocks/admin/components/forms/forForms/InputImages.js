import { useRef } from 'react'
import ImageZoom from 'react-medium-image-zoom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

const InputImages = ({
  images = [],
  onChange = () => {},
  onAddImage = () => {},
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
      <label>Картинки</label>
      <div className="flex flex-wrap w-full gap-2 px-1.5 py-1 bg-gray-200 border border-gray-700 rounded-lg">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <ImageZoom
              image={{
                src: image,
                alt: 'special',
                className: 'w-20 h-20',
                // style: { width: '50em' }
              }}
              zoomImage={{
                src: image,
                alt: 'product_image',
              }}
            />
            <FontAwesomeIcon
              className="absolute top-0 right-0 text-red-700 duration-200 transform cursor-pointer hover:scale-125"
              icon={faTrash}
              size="1x"
              onClick={() => {
                // images.splice(index, 1)
                onChange(images.filter((image, i) => i !== index))
              }}
            />
          </div>
        ))}
        {images.length < 4 ? (
          <div
            onClick={addImageClick}
            className="flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-500 cursor-pointer rounded-xl"
          >
            <div className="flex items-center justify-center w-20 transparent hover:scale-150 ">
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
        ) : null}
      </div>
    </div>
  )
}

export default InputImages
