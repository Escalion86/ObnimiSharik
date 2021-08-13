const Button = ({
  name = '',
  onClick,
  className = '',
  type = 'default',
  animation = false,
  small = false,
  inverse = false,
  disabled = false,
}) => {
  let colorBtn
  if (disabled) {
    if (inverse) {
      colorBtn = 'bg-gray-400 text-white'
    } else {
      colorBtn = 'text-gray-400 border-gray-400 bg-transparent '
    }
  } else if (type === 'alt') {
    if (inverse) {
      colorBtn = 'bg-yellow-300 text-white'
    } else {
      colorBtn = 'text-yellow-300 border-yellow-300 bg-transparent'
    }
  } else if (type === 'cancel') {
    if (inverse) {
      colorBtn = 'bg-red-700 text-white'
    } else {
      colorBtn = 'bg-white border-red-700 text-red-700'
    }
  } else {
    if (inverse) {
      colorBtn = 'bg-primary text-white'
    } else {
      colorBtn = 'bg-white border-primary text-primary'
    }
  }

  if (type === 'alt') {
    colorBtn = colorBtn + ' whitespace-nowrap h-12 font-futuraDemi rounded-full'
  } else {
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
