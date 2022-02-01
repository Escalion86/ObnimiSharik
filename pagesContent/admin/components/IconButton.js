import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'

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
    className={cn(
      'flex justify-center items-center duration-300',
      { 'flex-row-reverse': textPos === 'right' },
      { 'cursor-not-allowed': disabled || loading },
      small ? 'text-base h-8' : 'text-lg h-10',
      inverse
        ? disabled || loading
          ? 'bg-gray-400 text-white'
          : 'text-white hover:bg-toxic hover:border-toxic hover:text-white' +
            (active ? ' bg-yellow-400' : ' bg-primary')
        : ' border' +
            (disabled || loading
              ? 'bg-white text-gray-400 border-gray-400'
              : 'bg-white hover:bg-toxic hover:border-toxic hover:text-white' +
                (active
                  ? ' text-yellow-400 border-yellow-400'
                  : ' text-primary border-primary')),
      'gap-2 whitespace-nowrap shadow font-futuraDemi rounded-xl flex items-center justify-center',
      { 'animate-pulse-light': animation },
      className,
      name === '' ? (small ? 'w-8' : 'w-10') : 'px-2.5'
    )}
    disabled={disabled || loading}
  >
    {name && (
      <div
        className={cn('duration-300 max-w-100 overflow-hidden', {
          'max-w-0': loading,
        })}
      >
        {name}
      </div>
    )}
    {(icon || loading) && (
      <FontAwesomeIcon
        className={cn('w-5 h-5', { 'fa-spin': loading })}
        icon={loading ? faSpinner : icon}
      />
    )}
  </button>
)

export default IconButton
