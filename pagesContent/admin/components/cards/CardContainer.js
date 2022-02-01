import cn from 'classnames'

const CardContainer = ({ children, className = null }) => (
  <div className={cn('flex flex-1 p-2 gap-2', className)}>{children}</div>
)

export default CardContainer
