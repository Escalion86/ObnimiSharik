import cn from 'classnames'

const FormColumn = ({ children, className = null }) => (
  <div className={cn('flex flex-col flex-1 min-w-76 gap-y-2', className)}>
    {children}
  </div>
)

export default FormColumn
