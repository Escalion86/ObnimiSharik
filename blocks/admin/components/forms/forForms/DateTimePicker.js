import formatDateTime from '@helpers/formatDateTime'

const DateTimePicker = ({
  label = '',
  name,
  value,
  onChange,
  required = false,
  className,
  disabled = false,
  inLine = false,
  readOnly = false,
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
            'border-b-1 border-primary max-w-min whitespace-nowrap' +
            (inLine ? ' min-w-24 max-w-40 w-1/4' : '')
          }
          htmlFor={name}
        >
          {label}
          {required && <span className="text-red-700">*</span>}
        </label>
        {/* <div
          className={
            'px-2 py-1 border rounded-lg w-52' +
            (required && !value ? ' border-red-700' : ' border-gray-700')
          }
        > */}
        {formatDateTime(value)}
        {/* </div> */}
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
          'px-2 py-1 border rounded-lg w-50' +
          (required && !value ? ' border-red-700' : ' border-gray-700') +
          (disabled ? ' bg-gray-300  text-gray-600' : ' bg-gray-200 ')
        }
        type="datetime-local"
        step="600"
        name={name}
        value={formatDateTime(value, true)}
        onChange={(e) => {
          const value = e.target.value
          console.log(`value`, value)
          var year = value.substring(0, 4)
          var month = value.substring(5, 7)
          var day = value.substring(8, 10)
          var day = value.substring(8, 10)
          var hours = value.substring(11, 13)
          var minutes = value.substring(14, 16)

          onChange({
            ...e,
            target: {
              ...e.target,
              name: e.target.name,
              value: new Date(
                year,
                month - 1,
                day,
                hours,
                minutes
              ).toISOString(),
            },
          })
        }}
        // pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        min="2021-01-01T00:00"
        // max="2030-12-31T00:00"
      />
    </div>
  )
}

export default DateTimePicker
