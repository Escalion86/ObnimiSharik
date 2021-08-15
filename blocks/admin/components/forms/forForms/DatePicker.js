function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

const DatePicker = ({
  label = '',
  name,
  value,
  onChange,
  required = false,
  className,
  disabled = false,
}) => (
  <div className={'flex flex-col' + (className ? ' ' + className : '')}>
    <label htmlFor={name}>
      {label}
      {required ? <span className="text-red-700">*</span> : null}
    </label>
    <input
      className={
        'px-2 py-1 border rounded-lg ' +
        (required && !value ? 'border-red-700' : 'border-gray-700') +
        (disabled ? ' bg-gray-300  text-gray-600' : ' bg-gray-200 ')
      }
      type="date"
      id="start"
      name={name}
      value={formatDate(value)}
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
      // pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
      // min="2018-01-01"
      // max="2018-12-31"
    />
  </div>
)

export default DatePicker
