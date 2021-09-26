const FormColumn = ({ children, className = null }) => (
  <div
    className={
      'flex-1 min-w-76 gap-y-1  laptop:first:pl-0 laptop:pr-2 laptop:pl-2 laptop:last:pr-0 laptop:border-r last:border-none border-gray-400' +
      (className ? ' ' + className : '')
    }
  >
    {children}
  </div>
)

export default FormColumn
