import { faPlus } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@admincomponents/IconButton'

const TitleButton = ({ onClick = null, icon = faPlus, active = false }) => {
  if (!onClick) return null
  return <IconButton onClick={onClick} inverse icon={icon} active={active} />
}

export default TitleButton
