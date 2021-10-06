import formatDate from '@helpers/formatDate'

const DatePicker = ({
  label = '',
  name,
  value,
  onChange,
  required = false,
  className,
  disabled = false,
  inLine = false,
  readOnly = false,
  labelStyle = null,
}) => {
  if (readOnly)
    return (
      <div
        className={
          'flex' +
          (inLine ? ' flex-row items-center' : ' flex-col') +
          (className ? ' ' + className : '')
        }
      >
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
        </label>
        {formatDate(value)}
      </div>
    )

  return (
    <div
      className={
        'flex' +
        (inLine ? ' flex-row items-center' : ' flex-col') +
        (className ? ' ' + className : '')
      }
    >
      <label className={inLine ? 'min-w-24 max-w-40 w-1/4' : ''} htmlFor={name}>
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>
      <input
        className={
          'px-2 py-1 border rounded-lg ' +
          (required && !value ? 'border-red-700' : 'border-gray-700') +
          (disabled ? ' bg-gray-300  text-gray-600' : ' bg-gray-200 ')
        }
        type="date"
        name={name}
        value={formatDate(value, true)}
        onChange={(e) => {
          const value = e.target.value
          var year = value.substring(0, 4)
          var month = value.substring(5, 7)
          var day = value.substring(8, 10)

          onChange({
            ...e,
            target: {
              ...e.target,
              name: e.target.name,
              value: new Date(year, month - 1, day).toISOString(),
            },
          })
        }}
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        // min="2018-01-01"
        // max="2018-12-31"
      />
    </div>
  )
}

export default DatePicker
