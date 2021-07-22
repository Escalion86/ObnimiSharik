const Button = ({
  name = '',
  onClick,
  className = '',
  alt = false,
  animation = false,
  small = false,
  inverse = false,
}) => (
  <button
    onClick={onClick}
    className={
      (alt
        ? (small ? 'text-lg h-10 py-1 px-7' : 'text-xl h-12 py-2 px-8') +
          (inverse
            ? ' bg-yellow-300 text-white'
            : ' text-yellow-300 border-yellow-300 bg-transparent') +
          ' whitespace-nowrap h-12 font-futuraDemi rounded-full '
        : (small ? 'text-xl h-10 py-1 px-8' : 'text-2xl h-12 py-2 px-9') +
          (inverse
            ? ' bg-primary text-white'
            : ' bg-white border-white text-primary') +
          ' border whitespace-nowrap  shadow font-futuraDemi rounded-2xl ') +
      (animation ? ' animate-pulse-light' : '') +
      (className ? ' ' + className : '')
    }
  >
    {name}
  </button>
)

export default Button
