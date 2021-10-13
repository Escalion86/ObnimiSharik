const RowContainer = ({ children, className = null }) => (
  <div
    className={
      'grid grid-cols-2 gap-x-2.5' + (className ? ' ' + className : '')
    }
  >
    {children}
  </div>
)

export default RowContainer
