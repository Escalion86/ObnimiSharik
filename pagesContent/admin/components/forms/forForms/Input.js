import cn from 'classnames'

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
  wrapperStyle = null,
  inputStyle = null,
  postfix = null,
  prefix = null,
  prefixStyle = null,
  postfixStyle = null,
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
      <div className={cn('flex gap-x-1 flex-row', className)}>
        {label && (
          <div>
            <label
              className={cn(
                'border-b-1 border-primary max-w-min whitespace-nowrap',
                labelStyle
              )}
              htmlFor={name}
            >
              {label}:
            </label>
          </div>
        )}
        <div
          className={cn('flex flex-nowrap gap-x-1 ml-2', {
            'cursor-pointer text-primary hover:text-toxic': link,
          })}
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
      className={cn(
        'text-text flex',
        inLine ? ' flex-row items-center' : ' flex-col',
        className
      )}
    >
      {label && (
        <label
          className={cn(labelStyle, {
            'min-w-24 max-w-40 w-1/4': !labelStyle && inLine,
          })}
          htmlFor={name}
        >
          {label}
          {required && <span className="text-red-700">*</span>}
        </label>
      )}
      <div
        className={cn(
          'text-input flex flex-1 border rounded-lg flex-nowrap',
          required && (!value || value == '0')
            ? 'border-red-700'
            : 'border-gray-400',
          { 'bg-gray-200  text-disabled': disabled },
          wrapperStyle
        )}
      >
        {prefix && (
          <div
            className={cn(
              'select-none flex rounded-l-lg items-center justify-center bg-gray-200 min-w-6 px-0.5',
              prefixStyle
            )}
          >
            {prefix}
          </div>
        )}
        <div
          className={cn(
            'z-10 select-none flex-1 border-gray-400 overflow-hidden focus-within:shadow-active',
            prefix ? ' border-l' : ' rounded-l-lg',
            postfix ? ' border-r' : ' rounded-r-lg',
            inputStyle
          )}
        >
          <InputComponent
            className="flex-grow-0 w-full max-w-full px-1.5 py-1 outline-none"
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
          <div
            className={cn(
              'select-none flex rounded-r-lg items-center justify-center bg-gray-200 min-w-6 px-0.5',
              postfixStyle
            )}
          >
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
