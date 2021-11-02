import Input from './Input'

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
  const rubles = Math.floor(value / 100)
  const cops = Math.floor(value % 100)

  const onChangeUpd = (e, rub = true) => {
    let newValue
    if (rub) newValue = Number(e.target.value * 100) + cops
    else newValue = rubles * 100 + Number(e.target.value)

    onChange(newValue)
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
          'flex border rounded-lg w-44' +
          (required && (!value || value == '0')
            ? ' border-red-700'
            : ' border-gray-700')
        }
      >
        <Input
          // label={label}
          className="gap-x-0"
          inputStyle="border-0 rounded-r-none"
          labelStyle={labelStyle}
          type="number"
          name={name + '₽'}
          value={rubles}
          onChange={(e) => onChangeUpd(e, true)}
          // required={required}
          inLine={inLine}
          postfix="₽"
          readOnly={readOnly}
        />
        <Input
          // label={label}
          className={className}
          inputStyle="w-17 border-0 border-l rounded-l-none"
          labelStyle={labelStyle}
          type="number"
          name={name + 'коп'}
          value={cops}
          onChange={(e) => onChangeUpd(e, false)}
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
