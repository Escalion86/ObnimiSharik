import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'

const Fab = ({ onClick, show = true, icon = faPlus }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'duration-300 absolute flex items-center justify-center w-12 text-white rounded-full cursor-pointer h-14 hover:bg-toxic group tablet:w-14 tablet:h-14 bg-primary right-6 tablet:right-8',
        show ? 'tablet:bottom-8 bottom-6' : '-bottom-20'
      )}
    >
      <div
        style={{
          animation: `ping-small 3s cubic-bezier(0, 0, 0.2, 1) infinite`,
        }}
        className="absolute w-full h-full rounded-full bg-primary group-hover:bg-toxic"
      />
      <FontAwesomeIcon
        className="z-10 w-5 h-5 duration-200 group-hover:scale-110"
        icon={icon}
      />
    </div>
  )
}

export default Fab
