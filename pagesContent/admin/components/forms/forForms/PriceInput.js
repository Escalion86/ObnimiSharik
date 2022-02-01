import Input from './Input'
import cn from 'classnames'

const PriceInput = ({
  value,
  label = 'Стоимость',
  onChange,
  required = false,
  className,
  inLine,
  labelStyle,
  name = 'price',
  readOnly = false,
}) => {
  const rubles = value ? Math.floor(value / 100) : 0
  const cops = value ? Math.floor(value % 100) : 0

  if (readOnly)
    return (
      <div
        className={'flex gap-x-1 flex-row' + (className ? ' ' + className : '')}
      >
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
        <div className={'flex flex-nowrap gap-x-1'}>
          <div className="ml-2 italic">{(value ? value / 100 : 0) + ' ₽'}</div>
        </div>
      </div>
    )

  const onChangeUpd = (value, rub = true) => {
    let newValue
    if (rub) newValue = Number(value * 100) + cops
    else newValue = rubles * 100 + Number(value)

    onChange(newValue)
  }
  return (
    <div
      className={cn(
        'text-text flex w-min',
        inLine ? 'flex-row items-center' : 'flex-col',
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
          'flex border rounded-lg',
          required && (!value || value == '0')
            ? ' border-red-700'
            : ' border-gray-400'
        )}
      >
        <Input
          // label={label}
          className="gap-x-0"
          wrapperStyle="border-0 rounded-none w-22"
          postfixStyle="rounded-r-none"
          labelStyle={labelStyle}
          type="number"
          name={name + '₽'}
          value={rubles}
          onChange={(value) => onChangeUpd(value, true)}
          // required={required}
          inLine={inLine}
          postfix="₽"
          readOnly={readOnly}
          maxLength={6}
        />
        <Input
          // label={label}
          className={className}
          wrapperStyle="w-16 border-0 border-l rounded-none"
          inputStyle="rounded-l-none"
          labelStyle={labelStyle}
          type="number"
          name={name + 'коп'}
          value={cops}
          onChange={(value) => onChangeUpd(value, false)}
          // required={required}
          inLine={inLine}
          postfix="коп"
          readOnly={readOnly}
          maxLength={2}
        />
      </div>
    </div>
  )
}

export default PriceInput
