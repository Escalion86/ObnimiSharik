import formatDate from '@helpers/formatDate'
import birthDateToAge from '@helpers/birthDateToAge'

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
  showYears = false,
}) => {
  if (readOnly) {
    if (!value && value !== 0) return null
    return (
      <div className={'flex items-center' + (className ? ' ' + className : '')}>
        <label
          className={
            'border-b-1 border-primary max-w-min whitespace-nowrap' +
            (labelStyle
              ? ' ' + labelStyle
              : inLine
              ? ' min-w-24 max-w-40 w-1/4'
              : '')
          }
          htmlFor={name}
        >
          {label}:
        </label>
        <div className="ml-2 italic">{value ? formatDate(value) : '-'}</div>
        {value && showYears && (
          <div className="ml-2 whitespace-nowrap">
            {'(' + birthDateToAge(value) + ')'}
          </div>
        )}
      </div>
    )
  }

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
      <div className="flex items-center">
        <input
          className={
            'px-2 py-1 border max-w-40 rounded-lg ' +
            (required && !value ? 'border-red-700' : 'border-gray-700') +
            (disabled ? ' bg-gray-300  text-gray-600' : ' bg-gray-200 ')
          }
          type="date"
          name={name}
          defaultValue={formatDate(value, true)}
          onChange={(e) => {
            const value = e.target.value
            var year = value.substring(0, 4)
            var month = value.substring(5, 7)
            var day = value.substring(8, 10)

            onChange(new Date(year, month - 1, day).toISOString())
          }}
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          // min="2018-01-01"
          // max="2018-12-31"
        />
        {value && showYears && (
          <div className="ml-2 whitespace-nowrap">
            {'(' + birthDateToAge(value) + ')'}
          </div>
        )}
      </div>
    </div>
  )
}

export default DatePicker
