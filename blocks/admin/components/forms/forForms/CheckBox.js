const CheckBox = ({
  checked = false,
  onClick = null,
  onChange = null,
  small = false,
  label = null,
  labelPos = 'right',
  className = null,
}) => {
  const Label = () => (
    <span className="font-normal text-gray-700 dark:text-white">{label}</span>
  )
  return (
    <label
      className={
        'flex items-center cursor-pointer space-x-2' +
        (className ? ' ' + className : '')
      }
    >
      {label && labelPos === 'left' && <Label />}
      <input
        readOnly
        checked={checked}
        type="checkbox"
        className={
          'bg-white border border-gray-300 cursor-pointer appearance-none form-tick bg-check checked:bg-primary checked:border-transparent focus:outline-none ' +
          (small ? 'w-4 h-4 rounded-sm' : 'w-5 h-5 rounded-md')
        }
        onClick={onClick}
        onChange={onChange}
      />
      {label && labelPos !== 'left' && <Label />}
    </label>
  )
}

export default CheckBox
