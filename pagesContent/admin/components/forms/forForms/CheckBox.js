const CheckBox = ({
  checked = false,
  onClick = null,
  onChange = null,
  small = false,
  label = null,
  labelPos = 'right',
  className = null,
  name,
  readOnly = false,
}) => {
  const Label = () => (
    <span className="font-normal text-gray-700 dark:text-white">{label}</span>
  )

  if (readOnly && !checked) return null

  return (
    <label
      className={
        'flex items-center space-x-2' +
        (readOnly ? '' : ' cursor-pointer') +
        (className ? ' ' + className : '')
      }
      htmlFor={name}
    >
      {label && labelPos === 'left' && <Label />}
      {(!readOnly || checked) && (
        <input
          readOnly
          checked={checked}
          type="checkbox"
          className={
            (readOnly ? 'bg-gray-500' : 'checked:bg-primary cursor-pointer') +
            ' bg-white border border-gray-300 appearance-none form-tick from-blue-900 bg-check checked:border-transparent focus:outline-none ' +
            (small ? 'w-4 h-4 rounded-sm' : 'w-5 h-5 rounded-md')
          }
          onClick={!readOnly ? onClick : null}
          onChange={!readOnly ? onChange : null}
          name={name}
        />
      )}
      {label && labelPos !== 'left' && <Label />}
    </label>
  )
}

export default CheckBox
