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
  readOnly = false,
}) => {
  let childrenWithProps = children
  if (twoCols && children.length) {
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
          <div className="mx-6 text-lg font-semibold leading-5 text-center">
            {title}
          </div>
        )}
        <div
          className={
            'flex gap-y-2 gap-x-2' +
            (twoCols ? ' flex-col laptop:flex-row' : ' flex-col')
          }
        >
          {childrenWithProps}
        </div>
        {componentBeforeButton}
        {!readOnly && (
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
                onClick={onClose}
                name="Отмена"
                small
                inverse
                type="cancel"
                className="flex-1 max-w-md"
              />
            )}
          </div>
        )}
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
