const RowContainer = ({ children, className = null }) => (
  <div
    className={
      'flex flex-wrap justify-between gap-x-2.5' +
      (className ? ' ' + className : '')
    }
  >
    {children}
  </div>
)

export default RowContainer
