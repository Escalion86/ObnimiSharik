const CardContainer = ({ children, className = null }) => (
  <div className={'flex flex-1 p-2 gap-2' + (className ? ' ' + className : '')}>
    {children}
  </div>
)

export default CardContainer
