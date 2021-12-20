import { CheckBox } from '@admincomponents/forms/forForms'

const Card = ({
  className,
  inLine = false,
  onClick = null,
  children,
  multiselectMode = false,
  checked = false,
  onCheckClick = null,
}) => (
  <div
    className={
      'flex justify-between mx-1 my-1.5 bg-white rounded-lg shadow-large hover:shadow-medium-active' +
      (className ? ' ' + className : '') +
      (inLine ? ' laptop:h-10' : '')
    }
  >
    <div
      className={
        'duration-500 transition-scale overflow-hidden flex items-center justify-center rounded-l-lg bg-white' +
        (multiselectMode
          ? ' w-8 max-w-8 border-r'
          : ' w-0 scale-x-0 -translate-x-1/2')
      }
    >
      <CheckBox checked={checked} onClick={onCheckClick} />
    </div>
    <div
      onClick={onClick}
      className={
        'relative flex items-stretch justify-between flex-1' +
        (onClick ? ' cursor-pointer' : '')
      }
    >
      {children}
    </div>
  </div>
)

export default Card
