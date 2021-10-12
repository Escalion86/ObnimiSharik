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
  return (
    <Input
      label={label}
      className={className}
      inputStyle="max-w-30"
      labelStyle={labelStyle}
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      inLine={inLine}
      postfix="₽"
      readOnly={readOnly}
    />
  )
}

export default PriceInput
