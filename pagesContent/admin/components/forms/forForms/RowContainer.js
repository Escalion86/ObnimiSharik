import cn from 'classnames'

const RowContainer = ({ children, className = null }) => (
  <div className={cn('grid grid-cols-2 gap-x-2.5 gap-y-0.5', className)}>
    {children}
  </div>
)

export default RowContainer
