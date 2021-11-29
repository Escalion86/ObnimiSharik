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
  label = null,
  type,
  maxLength,
  name,
  value,
  onChange,
  required = false,
  textarea = false,
  accept,
  className = null,
  disabled = false,
  inLine = false,
  labelStyle = null,
  inputStyle = null,
  postfix = null,
  prefix = null,
  readOnly = false,
  hidden = false,
  defaultValue,
  link = null,
  onKeyDown,
  step,
}) => {
  if (hidden) return null
  if (readOnly) {
    if (!value && value !== 0) return null
    return (
      <div
        className={'flex gap-x-1 flex-row' + (className ? ' ' + className : '')}
      >
        {label && (
          <div>
            <label
              className={
                'border-b-1 border-primary max-w-min whitespace-nowrap' +
                (labelStyle ? ' ' + labelStyle : '')
              }
              htmlFor={name}
            >
              {label}:
            </label>
          </div>
        )}
        <div
          className={
            'flex flex-nowrap gap-x-1 ml-2' +
            (link ? ' cursor-pointer text-primary hover:text-toxic' : '')
          }
          onClick={
            link
              ? (event) => {
                  event.stopPropagation()
                  window.open(link)
                }
              : null
          }
        >
          {prefix && !!value && <div>{prefix}</div>}
          <div className="italic">
            {type === 'number'
              ? value
                ? parseInt(value)
                : 0
              : value
              ? value
              : '-'}
          </div>
          {postfix && !!value && <div>{postfix}</div>}
        </div>
      </div>
    )
  }

  const onChangeUpd = (e) => {
    const { value } = e.target
    if (type === 'number' && !value) onChange(0)
    else onChange(value)
  }

  return (
    <div
      className={
        'flex' +
        (inLine ? ' flex-row items-center' : ' flex-col') +
        (className ? ' ' + className : '')
      }
    >
      {label && (
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
      )}
      <div
        className={
          'flex flex-1 border rounded-lg flex-nowrap overflow-hidden ' +
          (required && (!value || value == '0')
            ? 'border-red-700'
            : 'border-gray-700') +
          (disabled ? ' bg-gray-300  text-gray-600' : ' bg-gray-200 ') +
          (inputStyle ? ' ' + inputStyle : '')
        }
      >
        {prefix && (
          <div className="flex items-center justify-center bg-gray-300 border-r border-gray-700 min-w-6 px-0.5">
            {prefix}
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          <InputComponent
            className="flex-grow-0 w-full max-w-full px-1.5 py-1 bg-gray-200 outline-none"
            type={type === 'number' ? 'text' : type}
            maxLength={maxLength}
            name={name}
            value={
              type === 'number' ? (value ? parseInt(value) : 0) : value ?? ''
            }
            onChange={onChangeUpd}
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
            defaultValue={defaultValue}
            onKeyDown={onKeyDown}
            step={step}
          />
        </div>
        {postfix && (
          <div className="flex items-center justify-center bg-gray-300 border-l border-gray-700 min-w-6 px-0.5">
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
