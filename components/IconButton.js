import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconButton = ({
  name = '',
  onClick,
  className = '',
  animation = false,
  small = false,
  inverse = false,
  icon = null,
  disabled = false,
  active = false,
  textPos = 'right',
  loading = false,
}) => (
  <button
    onClick={onClick}
    className={
      'flex justify-center items-center duration-300 ' +
      (textPos = 'right' ? 'flex-row-reverse ' : '') +
      (disabled || loading ? 'cursor-not-allowed ' : '') +
      (small ? 'text-base h-8' : 'text-lg h-10') +
      (inverse
        ? disabled || loading
          ? ' bg-gray-400 text-white'
          : ' text-white hover:bg-toxic hover:border-toxic hover:text-white' +
            (active ? ' bg-yellow-400' : ' bg-primary')
        : ' border' +
          (disabled || loading
            ? ' bg-white text-gray-400 border-gray-400'
            : ' bg-white hover:bg-toxic hover:border-toxic  hover:text-white' +
              (active
                ? ' text-yellow-400 border-yellow-400'
                : ' text-primary border-primary'))) +
      ' gap-2 whitespace-nowrap shadow font-futuraDemi rounded-xl flex items-center justify-center' +
      (animation ? ' animate-pulse-light' : '') +
      (className ? ' ' + className : '') +
      (name === '' ? (small ? ' w-8' : ' w-10') : ' px-2.5')
    }
    disabled={disabled || loading}
  >
    {name && (
      <div
        className={
          'duration-300 max-w-100 overflow-hidden' + (loading ? ' max-w-0' : '')
        }
      >
        {name}
      </div>
    )}
    {(icon || loading) && (
      <FontAwesomeIcon
        className={'w-5 h-5' + (loading ? ' fa-spin' : '')}
        icon={loading ? faSpinner : icon}
      />
    )}
  </button>
)

export default IconButton
