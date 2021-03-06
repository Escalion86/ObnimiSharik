const ComboBox = ({
  name,
  title,
  defaultValue = '',
  onChange,
  placeholder,
  items,
  required = false,
  inLine = false,
  readOnly = false,
}) => {
  const defaultItem = items.find((item) => item.value === defaultValue)
  const defaultValueExists = !!defaultItem

  if (readOnly)
    return (
      <div className="flex">
        <div className="border-b-1 border-primary max-w-min whitespace-nowrap">
          {title}:
        </div>
        <div className="ml-2 italic">
          {defaultValueExists ? defaultItem.name : ''}
        </div>
      </div>
    )

  return (
    <div
      className={'flex ' + (inLine ? 'flex-row items-center ' : 'flex-col ')}
    >
      <label className={inLine ? 'min-w-24 max-w-40 w-1/4' : ''} htmlFor={name}>
        {title}
      </label>
      <select
        name={name}
        className={
          'px-2 py-1 bg-gray-200 border rounded-lg ' +
          (required && !defaultValue ? 'border-red-700' : 'border-gray-700')
        }
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValueExists ? defaultValue : ''}
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {items.map((item, index) => (
          <option key={'combo' + index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ComboBox
