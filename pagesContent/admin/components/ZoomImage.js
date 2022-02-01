import Zoom from 'react-medium-image-zoom'
import cn from 'classnames'

const ZoomImage = ({
  image,
  noImage,
  containerClassName = null,
  imageClassName = null,
  alt = 'image',
}) =>
  image ? (
    <div
      className={cn('overflow-hidden flex items-center', containerClassName, {
        'h-24': !containerClassName,
      })}
      onClick={(event) => event.stopPropagation()}
    >
      <Zoom zoomMargin={20}>
        <img
          className={cn('object-cover', imageClassName, {
            'h-24': !imageClassName,
          })}
          src={image}
          alt={alt}
        />
      </Zoom>
    </div>
  ) : (
    <div
      className={cn('overflow-hidden', containerClassName, {
        'h-24': !containerClassName,
      })}
      // onClick={(event) => event.stopPropagation()}
    >
      <img
        className={cn('object-cover', imageClassName, {
          'h-24': !imageClassName,
        })}
        src={noImage ?? '/img/no_image.png'}
        alt={alt}
      />
    </div>
  )

export default ZoomImage
