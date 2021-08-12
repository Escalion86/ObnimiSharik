const Button = ({
  name = '',
  onClick,
  className = '',
  alt = false,
  animation = false,
  small = false,
  inverse = false,
  disabled = false,
}) => {
  let colorBtn
  if (alt) {
    if (inverse) {
      colorBtn = disabled
        ? 'bg-gray-400 text-white'
        : 'bg-yellow-300 text-white'
    } else {
      colorBtn = disabled
        ? 'text-gray-400 border-gray-400 bg-transparent '
        : 'text-yellow-300 border-yellow-300 bg-transparent'
    }
    colorBtn = colorBtn + ' whitespace-nowrap h-12 font-futuraDemi rounded-full'
  } else {
    if (inverse) {
      colorBtn = disabled ? 'bg-gray-400 text-white' : 'bg-primary text-white'
    } else {
      colorBtn = disabled
        ? 'bg-white border-gray-400 text-gray-400'
        : 'bg-white border-white text-primary'
    }
    colorBtn =
      colorBtn + ' border whitespace-nowrap shadow font-futuraDemi rounded-2xl'
  }
  return (
    <button
      onClick={onClick}
      className={
        (small ? 'text-lg h-10 py-1 px-7 ' : 'text-xl h-12 py-2 px-8 ') +
        colorBtn +
        (animation ? ' animate-pulse-light' : '') +
        (className ? ' ' + className : '') +
        (disabled ? ' cursor-not-allowed' : '')
      }
      disabled={disabled}
    >
      {name}
    </button>
  )
}

export default Button
