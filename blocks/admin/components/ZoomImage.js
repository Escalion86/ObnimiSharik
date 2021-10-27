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
        'overflow-hidden' +
        (containerClassName ? ' ' + containerClassName : ' h-24')
      }
      onClick={(event) => event.stopPropagation()}
    >
      <Zoom zoomMargin={20}>
        <img
          className={
            'object-cover' + (imageClassName ? ' ' + imageClassName : ' h-24')
          }
          src={image}
          alt={alt}
        />
      </Zoom>
    </div>
  ) : (
    <div
      className={
        'overflow-hidden' +
        (containerClassName ? ' ' + containerClassName : ' h-24')
      }
      // onClick={(event) => event.stopPropagation()}
    >
      <img
        className={
          'object-cover' + (imageClassName ? ' ' + imageClassName : ' h-24')
        }
        src={noImage ?? '/img/no_image.png'}
        alt={alt}
      />
    </div>
  )

export default ZoomImage
