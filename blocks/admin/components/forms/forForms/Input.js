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
}) => {
  return (
    <div className={'flex flex-col' + (className ? ' ' + className : '')}>
      <label htmlFor={name}>{label}</label>
      <InputComponent
        className="px-2 py-1 bg-gray-200 border border-gray-700 rounded-lg"
        type={type}
        maxLength={maxLength}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        textarea={textarea}
        accept={accept}
      />
    </div>
  )
}

export default Input
