import Button from '@components/Button'

const Form = ({
  handleSubmit = () => {},
  title = '',
  message = '',
  errors = {},
  children,
  buttonName = 'Создать',
}) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="text-lg font-semibold text-center">{title}</div>
        {children}
        <Button onClick={handleSubmit} name={buttonName} small inverse />
      </div>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form
