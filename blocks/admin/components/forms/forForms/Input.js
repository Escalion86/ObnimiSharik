const InputComponent = (props) => {
  const newProps = { ...props }
  delete newProps['textarea']
  return props.textarea ? (
    <textarea {...newProps} rows={4} />
  ) : (
    <input {...newProps} />
  )
}

const Input = ({
  label = '',
  type,
  maxLength,
  name,
  value,
  onChange,
  required = false,
  textarea,
  accept,
  className,
  disabled = false,
}) => {
  return (
    <div className={'flex flex-col' + (className ? ' ' + className : '')}>
      <label htmlFor={name}>
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>
      <InputComponent
        className={
          'px-2 py-1 border rounded-lg ' +
          (required && !value ? 'border-red-700' : 'border-gray-700') +
          (disabled ? ' bg-gray-300  text-gray-600' : ' bg-gray-200 ')
        }
        type={type === 'number' ? 'text' : type}
        maxLength={maxLength}
        name={name}
        value={type === 'number' ? parseInt(value) : value}
        onChange={
          type === 'number'
            ? (e) => {
                e.target.value = Number(e.target.value)
                onChange(e)
              }
            : onChange
        }
        required={required}
        textarea={textarea}
        accept={accept}
        disabled={disabled}
        onKeyPress={
          type === 'number'
            ? (e) => {
                e = e || window.event
                var charCode =
                  typeof e.which == 'undefined' ? e.keyCode : e.which
                if (!(charCode >= 48 && charCode <= 57)) {
                  e.preventDefault()
                }
              }
            : null
        }
      />
    </div>
  )
}

export default Input
