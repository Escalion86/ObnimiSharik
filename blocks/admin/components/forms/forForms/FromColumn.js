const FormColumn = ({ children, className = null }) => (
  <div
    className={'flex-1 min-w-76 gap-y-1' + (className ? ' ' + className : '')}
  >
    {children}
  </div>
)

export default FormColumn
