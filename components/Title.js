import HorizontalSeparator from './HorizontalSeparator'

const Title = ({ title, white = false, small = false }) => (
  <div>
    <h3
      className={
        'font-futuraDemi ' +
        (small ? 'text-4xl' : 'text-5xl') +
        (white ? '' : ' text-gray-600')
      }
    >
      {title}
    </h3>
    <HorizontalSeparator white={white} />
  </div>
)

export default Title
