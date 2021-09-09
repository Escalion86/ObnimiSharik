const Card = ({ className, inLine = false, onClick = null, children }) => (
  <div
    onClick={onClick}
    className={
      'relative items-center flex border border-gray-200 mx-1 my-1.5 bg-white rounded-lg shadow-medium hover:shadow-medium-active' +
      (onClick ? ' cursor-pointer' : '') +
      (className ? ' ' + className : '') +
      (inLine ? ' h-10' : '')
    }
  >
    {children}
  </div>
)

export default Card
