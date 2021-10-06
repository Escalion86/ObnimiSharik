const FormColumn = ({ children, className = null }) => (
  <div
    className={
      'flex flex-col flex-1 min-w-76 gap-y-2' +
      (className ? ' ' + className : '')
    }
  >
    {children}
  </div>
)

export default FormColumn
