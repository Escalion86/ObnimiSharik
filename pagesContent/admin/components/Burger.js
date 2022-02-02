import cn from 'classnames'

const Burger = ({
  menuOpen = () => {},
  onClick = () => {},
  wrapperClassName = null,
  burgerClassName = null,
  burgerStyle = null,
}) => {
  return (
    <div
      className={cn('menu-btn', { open: menuOpen }, wrapperClassName)}
      onClick={onClick}
    >
      <div
        className={cn('menu-btn__burger', burgerClassName)}
        style={{
          ...burgerStyle,
          '&::before': { ...burgerStyle },
        }}
      />
    </div>
  )
}

export default Burger
