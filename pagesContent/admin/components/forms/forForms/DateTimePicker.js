import formatDateTime from '@helpers/formatDateTime'
import cn from 'classnames'

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
        className={cn(
          'flex',
          inLine || readOnly ? 'flex-row items-center' : 'flex-col',
          className
        )}
      >
        <label
          className={cn(
            'border-b-1 border-primary max-w-min whitespace-nowrap',
            { 'min-w-24 max-w-40 w-1/4': inLine }
          )}
          htmlFor={name}
        >
          {label}
          {readOnly ? ':' : ''}
          {!readOnly && required && <span className="text-red-700">*</span>}
        </label>
        {/* <div
          className={
            'px-2 py-1 border rounded-lg w-52' +
            (required && !value ? ' border-red-700' : ' border-gray-700')
          }
        > */}
        <div className={readOnly ? ' ml-2' : ''}>{formatDateTime(value)}</div>
        {/* </div> */}
      </div>
    )

  return (
    <div
      className={cn(
        'text-text flex',
        inLine ? 'flex-row items-center' : 'flex-col',
        className
      )}
    >
      <label
        className={cn({ 'min-w-24 max-w-40 w-1/4': inLine })}
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>
      <input
        className={cn(
          'text-input px-2 py-1 border rounded-lg w-50 outline-none focus:shadow-active',
          required && !value ? ' border-red-700' : ' border-gray-400',
          { 'bg-gray-200  text-disabled': disabled }
        )}
        type="datetime-local"
        step="600"
        name={name}
        value={formatDateTime(value, true)}
        onChange={(e) => {
          const value = e.target.value
          var year = value.substring(0, 4)
          var month = value.substring(5, 7)
          var day = value.substring(8, 10)
          var day = value.substring(8, 10)
          var hours = value.substring(11, 13)
          var minutes = value.substring(14, 16)

          onChange(new Date(year, month - 1, day, hours, minutes).toISOString())
        }}
        // pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        min="2021-01-01T00:00"
        // max="2030-12-31T00:00"
      />
    </div>
  )
}

export default DateTimePicker
