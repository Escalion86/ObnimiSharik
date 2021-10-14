import { faMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GENDERS } from '@helpers/constants'
const colors = [
  'border-blue-400',
  'border-red-400',
  'text-red-400',
  'text-blue-400',
]

const GenderItem = ({
  active = false,
  value = 0,
  name = '',
  color = 'gray-400',
  icon = faMars,
  onClick = null,
}) => (
  <div
    className={
      `flex duration-300 items-center justify-center border px-2 py-1 rounded-lg cursor-pointer gap-x-2 flex-nowrap border-${color}` +
      (active ? ` text-white bg-${color}` : ` text-${color} bg-white`)
    }
    onClick={() => onClick(value)}
  >
    <FontAwesomeIcon icon={icon} size="lg" />
    <div
      className={'duration-300 ' + (active ? 'text-white' : 'text-gray-400')}
    >
      {name}
    </div>
  </div>
)

const GenderPicker = ({
  gender,
  label = 'Пол',
  onChange = null,
  inLine = false,
  className = null,
  labelStyle = null,
  name = 'gender',
  required = false,
}) => (
  <div
    className={
      'flex' +
      (inLine ? ' flex-row items-center' : ' flex-col') +
      (className ? ' ' + className : '')
    }
  >
    {label && (
      <label
        className={
          labelStyle ? ' ' + labelStyle : inLine ? 'max-w-40 w-1/4' : ''
        }
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>
    )}
    <div className="flex gap-x-2 flex-nowrap">
      {GENDERS.map((genderItem) => (
        <GenderItem
          key={'gender' + genderItem.value}
          active={genderItem.value === gender}
          value={genderItem.value}
          name={genderItem.name}
          icon={genderItem.icon}
          color={genderItem.color}
          onClick={() => onChange(genderItem.value)}
        />
      ))}
    </div>
  </div>
)

export default GenderPicker
