function formatDateTime(dateTime) {
  if (!dateTime) return undefined
  var d = new Date(dateTime),
    minutes = '' + d.getMinutes(),
    hours = '' + d.getHours(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  if (hours.length < 2) hours = '0' + hours
  if (minutes.length < 2) minutes = '0' + minutes
  // if (minutes == 60) {
  //   minutes = 59
  //   hours -= 1
  // }

  return [year, month, day].join('-') + 'T' + [hours, minutes].join(':')
}

const DateTimePicker = ({
  label = '',
  name,
  value,
  onChange,
  required = false,
  className,
  disabled = false,
  inLine = false,
}) => (
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
        'px-2 py-1 border rounded-lg w-52' +
        (required && !value ? ' border-red-700' : ' border-gray-700') +
        (disabled ? ' bg-gray-300  text-gray-600' : ' bg-gray-200 ')
      }
      type="datetime-local"
      step="600"
      name={name}
      value={formatDateTime(value)}
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
            value: new Date(year, month - 1, day, hours, minutes).toISOString(),
          },
        })
      }}
      // pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
      min="2021-01-01T00:00"
      // max="2030-12-31T00:00"
    />
  </div>
)

export default DateTimePicker
