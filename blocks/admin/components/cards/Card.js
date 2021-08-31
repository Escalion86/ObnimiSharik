const Card = ({ onClick = null, children }) => (
  <div
    onClick={onClick}
    className={
      'relative flex items-center p-2 mx-1 my-2 bg-white rounded-lg shadow-medium hover:shadow-medium-active' +
      (onClick ? ' cursor-pointer' : '')
    }
  >
    {children}
  </div>
)

export default Card
