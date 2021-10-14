import { PRIORITIES } from '@helpers/constants'

const colors = ['border-yellow-400', 'border-green-400', 'border-red-400']

const PriorityItem = ({
  active = false,
  value = 0,
  name = '',
  color = 'gray-400',
  onClick = null,
}) => (
  <div
    className={
      `flex duration-300 items-center justify-center border px-2 py-1 rounded-lg cursor-pointer gap-x-2 flex-nowrap border-${color}` +
      (active ? ` text-white bg-${color}` : ` text-${color} bg-white`)
    }
    onClick={() => onClick(value)}
  >
    <div
      className={'duration-300 ' + (active ? 'text-white' : 'text-gray-400')}
    >
      {name}
    </div>
  </div>
)

const PriorityPicker = ({
  priority,
  label = 'Приоритет',
  onChange = null,
  inLine = false,
  className = null,
  labelStyle = null,
  name = 'priority',
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
          labelStyle
            ? ' ' + labelStyle
            : inLine
            ? 'min-w-24 max-w-40 w-1/4'
            : ''
        }
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>
    )}
    <div className="flex gap-x-2 flex-nowrap">
      {PRIORITIES.map((item) => (
        <PriorityItem
          key={'priority' + item.value}
          active={item.value === priority}
          value={item.value}
          name={item.name}
          color={item.color}
          onClick={() => onChange(item.value)}
        />
      ))}
    </div>
  </div>
)

export default PriorityPicker
