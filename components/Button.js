const Button = ({
  name,
  onClick,
  className = '',
  alt = false,
  animation = false,
  small = false,
}) => (
  <button
    onClick={onClick}
    className={
      (alt
        ? (small ? 'text-lg h-10 py-1 px-7' : 'text-xl h-12 py-2 px-8') +
          ' whitespace-nowrap h-12 bg-transparent border border-yellow-300 font-futuraDemi rounded-full text-yellow-300'
        : (small ? 'text-xl h-10 py-1 px-8' : 'text-2xl h-12 py-2 px-9') +
          ' whitespace-nowrap bg-white border border-white shadow font-futuraDemi rounded-2xl text-primary') +
      (animation ? ' animate-pulse-light' : '') +
      (className ? ' ' + className : '')
    }
  >
    {name}
  </button>
)

export default Button
