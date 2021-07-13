import ImageZoom from 'react-medium-image-zoom'

const SpecialCard = ({ src }) => (
  <ImageZoom
    image={{
      src: src,
      alt: 'special',
      className: 'w-48 shadow-sm rounded-xl cursor-zoom-in',
      // style: { width: '50em' }
    }}
    zoomImage={{
      src: src,
      alt: 'special',
    }}
  />
  // <img
  //   src={src}
  //   alt="special"
  //   className="w-48 shadow-sm rounded-xl cursor-zoom-in"
  // />
)

export default SpecialCard
