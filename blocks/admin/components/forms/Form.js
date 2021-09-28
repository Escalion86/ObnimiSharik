import React from 'react'
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
  twoCols = false,
  onClose = () => {},
  componentBeforeButton = null,
}) => {
  let childrenWithProps = children
  if (twoCols) {
    const updatedChildren = []
    children.forEach((child, index) => {
      if (index > 0)
        updatedChildren.push(
          <div className="w-0 border-gray-400 border-l-1 laptop:visible" />
        )
      updatedChildren.push(child)
    })
    childrenWithProps = React.Children.map(updatedChildren, (child, index) => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { key: 'formChild' + index })
      }
      return child
    })
  }
  return (
    <>
      <div className="flex flex-col gap-y-2">
        {title && (
          <div className="text-lg font-semibold text-center">{title}</div>
        )}
        <div
          className={
            'flex gap-y-1 gap-x-2' +
            (twoCols ? ' flex-col laptop:flex-row' : ' flex-col')
          }
        >
          {childrenWithProps}
        </div>
        {componentBeforeButton}
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => {
              handleSubmit()
              onClose()
            }}
            name={buttonName}
            small
            inverse
            disabled={buttonDisabled}
            className="flex-1 max-w-md"
          />
          {cancelButton && (
            <Button
              onClick={onClose}
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
