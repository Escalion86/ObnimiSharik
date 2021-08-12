import Button from '@components/Button'

const Form = ({
  handleSubmit = () => {},
  title = '',
  message = '',
  errors = {},
  children,
  buttonName = 'Создать',
  buttonDisabled = false,
}) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="text-lg font-semibold text-center">{title}</div>
        {children}
        <Button
          onClick={handleSubmit}
          name={buttonName}
          small
          inverse
          disabled={buttonDisabled}
        />
      </div>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li className="text-red-700" key={index}>
            {errors[err]}
          </li>
        ))}
      </div>
    </>
  )
}

export default Form
