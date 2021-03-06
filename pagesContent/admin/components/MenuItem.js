import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MenuItem = ({ onClick, icon, name, disabled = false }) => (
  <a
    className={
      (disabled
        ? 'text-gray-600 bg-gray-200 cursor-default'
        : 'hover:bg-primary hover:text-white text-gray-900 cursor-pointer') +
      ' group flex gap-x-1 items-center w-full px-2 py-2 text-sm'
    }
    onClick={onClick && !disabled ? onClick : null}
  >
    <div className="flex justify-center w-5">
      <FontAwesomeIcon
        className={
          (disabled ? 'text-gray-600' : 'text-primary group-hover:text-white') +
          ' w-4 h-4 mx-auto'
        }
        icon={icon}
      />
    </div>
    <div
      className={
        (disabled ? '' : 'text-gray-900 group-hover:text-white') + ' flex-1'
      }
    >
      {name}
    </div>
  </a>
)

export default MenuItem
