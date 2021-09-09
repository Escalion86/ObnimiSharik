import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

const IconButton = ({
  name = '',
  onClick,
  className = '',
  animation = false,
  small = false,
  inverse = false,
  icon = faQuestion,
  disabled = false,
  active = false,
}) => (
  <button
    onClick={onClick}
    className={
      (small ? 'text-base h-8' : 'text-lg h-10') +
      (inverse
        ? ' text-white ' + (active ? ' bg-yellow-400' : 'bg-primary')
        : ' bg-white border-white ' +
          (active ? ' text-yellow-400' : 'text-primary')) +
      ' border whitespace-nowrap shadow font-futuraDemi rounded-xl flex items-center justify-center hover:bg-toxic' +
      (animation ? ' animate-pulse-light' : '') +
      (className ? ' ' + className : '') +
      (name === '' ? (small ? ' w-8' : ' w-10') : ' px-3')
    }
    disabled={disabled}
  >
    {icon && (
      <FontAwesomeIcon
        className={'w-5 h-5 text-white' + (name === '' ? '' : ' mr-2')}
        icon={icon}
      />
    )}
    {name}
  </button>
)

export default IconButton
