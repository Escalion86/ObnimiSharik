const InputComponent = (props) => {
  const newProps = { ...props }
  delete newProps['textarea']
  return props.textarea ? (
    <textarea {...newProps} rows={3} />
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
  textarea = false,
  accept,
  className,
  disabled = false,
  inLine = false,
  labelStyle = null,
  inputStyle = null,
  postfix = null,
  prefix = null,
  readOnly = false,
  hidden = false,
}) => {
  if (hidden) return null
  if (readOnly)
    return (
      <div
        className={
          'flex gap-x-1' +
          (inLine ? ' flex-row items-center' : ' flex-col') +
          (className ? ' ' + className : '')
        }
      >
        <label
          className={
            'border-b-1 border-primary max-w-min whitespace-nowrap' +
            (labelStyle ? ' ' + labelStyle : '')
          }
          htmlFor={name}
        >
          {label}:
        </label>
        <div className="flex flex-nowrap gap-x-1">
          {prefix && <div>{prefix}</div>}
          <div className="ml-2 italic">
            {type === 'number' ? parseInt(value) : value}
          </div>
          {postfix && <div>{postfix}</div>}
        </div>
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
      <label
        className={
          labelStyle
            ? ' ' + labelStyle
            : inLine
            ? 'min-w-24 max-w-40 w-1/4'
            : ''
        }
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>
      <div
        className={
          'flex flex-1 border rounded-lg flex-nowrap overflow-hidden ' +
          (required && !value ? 'border-red-700' : 'border-gray-700') +
          (disabled ? ' bg-gray-300  text-gray-600' : ' bg-gray-200 ') +
          (inputStyle ? ' ' + inputStyle : '')
        }
      >
        {prefix && (
          <div className="flex items-center justify-center bg-gray-300 border-r border-gray-700 rounded-l-lg min-w-6">
            {prefix}
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          <InputComponent
            className="flex-grow-0 w-full max-w-full px-2 py-1 bg-gray-200 outline-none"
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
                      e?.preventDefault()
                    }
                  }
                : null
            }
          />
        </div>
        {postfix && (
          <div className="flex items-center justify-center w-6 bg-gray-300 border-l border-gray-700 rounded-r-lg">
            {postfix}
          </div>
        )}
      </div>
      {/* <InputComponent
        className={
          'flex-1 px-2 py-1 border rounded-lg outline-none' +
          (required && !value ? ' border-red-700' : ' border-gray-700') +
          (disabled ? ' bg-gray-300  text-gray-600' : ' bg-gray-200 ') +
          (inputStyle ? ' ' + inputStyle : '')
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
                  e?.preventDefault()
                }
              }
            : null
        }
      /> */}
    </div>
  )
}

export default Input
