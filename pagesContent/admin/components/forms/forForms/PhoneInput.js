import InputMask from 'react-input-mask'
import cn from 'classnames'

const PhoneInput = ({
  value,
  label,
  name,
  onChange,
  required = false,
  className,
  disabled,
  inLine = false,
  readOnly = false,
  link = null,
}) => {
  if (readOnly) {
    if (!value && value !== 0) return null
    return (
      <div className={cn('flex gap-x-1 flex-row', className)}>
        {label && (
          <div>
            <label
              className={
                'border-b-1 border-primary max-w-min whitespace-nowrap'
              }
              htmlFor={name}
            >
              {label}:
            </label>
          </div>
        )}
        <div
          className={cn('flex flex-nowrap gap-x-1', {
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
          <div className="ml-2 italic">{value ? '+' + value : '-'}</div>
        </div>
      </div>
    )
  }
  return (
    <div
      className={cn(
        'text-text flex',
        inLine ? ' flex-row items-center' : ' flex-col',
        className
      )}
    >
      <label className={inLine ? 'min-w-24 max-w-40 w-1/4' : ''} htmlFor={name}>
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>

      <InputMask
        className={cn(
          'text-input w-36 px-2 py-1 border rounded-lg outline-none focus:shadow-active',
          required && (!value || value.toString().length !== 11)
            ? 'border-red-700'
            : 'border-gray-400',
          { 'bg-gray-300  text-disabled': disabled }
        )}
        name={name}
        mask="+7 999-999-9999"
        maskChar="_"
        alwaysShowMask
        value={value || ''}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, '')
          onChange(value === '7' ? null : Number(value))
        }}
      />
    </div>
  )
}

export default PhoneInput
