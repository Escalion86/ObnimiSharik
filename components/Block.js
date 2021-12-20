function Block({ children = null, className = '', style = {} }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={
          // 'w-full phoneV:w-phoneV phoneH:w-phoneH tablet:w-tablet laptop:w-laptop' +
          'flex-1 phoneV:max-w-100 phoneH:max-w-124 tablet:max-w-140 laptop:max-w-248 desktop:max-w-284 desktop:w-284' +
          (className ? ' ' + className : '')
        }
        style={style}
      >
        {children}
      </div>
    </div>
  )
}

export default Block
