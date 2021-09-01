import Button from '@components/Button'

const Form = ({
  handleSubmit = () => {},
  title = null,
  message = '',
  errors = {},
  children,
  buttonName = 'Создать',
  buttonDisabled = false,
  cancelButton = false,
}) => {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        {title && (
          <div className="text-lg font-semibold text-center">{title}</div>
        )}
        {children}
        <div className="flex justify-center gap-2">
          <Button
            onClick={handleSubmit}
            name={buttonName}
            small
            inverse
            disabled={buttonDisabled}
            className="flex-1 max-w-md"
          />
          {cancelButton && (
            <Button
              onClick={cancelButton}
              name="Отмена"
              small
              inverse
              type="cancel"
              className="flex-1 max-w-md"
            />
          )}
        </div>
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
