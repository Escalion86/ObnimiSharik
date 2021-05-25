function Block({ children = null, className = '', style = {} }) {
  return (
    <div className="flex w-full">
      <div
        className={
          // 'w-full phoneV:w-phoneV phoneH:w-phoneH tablet:w-tablet laptop:w-laptop' +
          'flex-1 phoneV:mx-2 phoneH:mx-4 tablet:mx-6 laptop:mx-8 desktop:mx-12' +
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
