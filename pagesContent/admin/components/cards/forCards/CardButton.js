import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@material-ui/core'
import cn from 'classnames'

const CardButton = ({
  name = '',
  onClick,
  className = '',
  icon = faQuestion,
  disabled = false,
  tooltip = null,
}) => (
  <Tooltip
    title={<div className="text-xs">{tooltip}</div>}
    arrow
    placement="top"
  >
    <button
      onClick={onClick}
      className={cn(
        'h-full w-8 whitespace-nowrap shadow font-futuraDemi flex items-center justify-center hover:bg-toxic duration-300 group',
        className
      )}
      disabled={disabled}
    >
      <FontAwesomeIcon
        className="w-3 h-3 text-white duration-300 group-hover:scale-110"
        icon={icon}
      />
      {name}
    </button>
  </Tooltip>
)

export default CardButton
