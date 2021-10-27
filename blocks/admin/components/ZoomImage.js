import Zoom from 'react-medium-image-zoom'

const ZoomImage = ({
  image,
  noImage,
  containerClassName = null,
  imageClassName = null,
  alt = 'image',
}) =>
  image ? (
    <div
      className={
        'h-24 overflow-hidden' +
        (containerClassName ? ' ' + containerClassName : '')
      }
      onClick={(event) => event.stopPropagation()}
    >
      <Zoom zoomMargin={20}>
        <img
          className={
            'h-24 object-cover' + (imageClassName ? ' ' + imageClassName : '')
          }
          src={image}
          alt={alt}
        />
      </Zoom>
    </div>
  ) : (
    <img
      className={
        'h-24 object-cover' + (imageClassName ? ' ' + imageClassName : '')
      }
      src={noImage ?? '/img/no_image.png'}
      alt={alt}
    />
  )

export default ZoomImage
