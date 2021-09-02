import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

const CardButton = ({
  name = '',
  onClick,
  className = '',
  icon = faQuestion,
  disabled = false,
}) => (
  <button
    onClick={onClick}
    className={
      'h-full w-8 whitespace-nowrap shadow font-futuraDemi flex items-center justify-center hover:bg-toxic' +
      (className ? ' ' + className : '')
    }
    disabled={disabled}
  >
    <FontAwesomeIcon className="w-3 h-3 text-white" icon={icon} />
    {name}
  </button>
)

export default CardButton
