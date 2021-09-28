const RadioBox = ({
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
        type="radio"
        className={
          'bg-white border cursor-pointer rounded-full border-gray-300 appearance-none form-tick bg-radio checked:bg-primary checked:border-transparent focus:outline-none ' +
          (small ? 'w-4 h-4' : 'w-5 h-5')
        }
        onChange={onChange}
        onClick={onClick}
      />
      {label && labelPos !== 'left' && <Label />}
    </label>
  )
}

export default RadioBox
