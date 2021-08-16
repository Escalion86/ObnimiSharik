import InputMask from 'react-input-mask'

const PhoneInput = ({
  value,
  label,
  name,
  onChange,
  required = false,
  className,
  disabled,
}) => {
  return (
    <div className={'flex flex-col w-32' + (className ? ' ' + className : '')}>
      <label htmlFor={name}>
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>

      <InputMask
        className={
          'w-36 px-2 py-1 border rounded-lg ' +
          (required && !value ? 'border-red-700' : 'border-gray-700') +
          (disabled ? ' bg-gray-300  text-gray-600' : ' bg-gray-200 ')
        }
        name={name}
        mask="+7 999-999-9999"
        maskChar="_"
        alwaysShowMask
        value={value}
        onChange={(e) =>
          onChange({
            ...e,
            target: {
              ...e.target,
              name: e.target.name,
              value: e.target.value.replace(/[^0-9]/g, ''),
            },
          })
        }
      />
    </div>
  )
}

export default PhoneInput
