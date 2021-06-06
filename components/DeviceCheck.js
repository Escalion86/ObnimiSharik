function DeviceCheck() {
  return (
    <div className="fixed left-0 z-50 flex items-center justify-center h-24 text-sm leading-3 w-9 top-20 bg-primary rounded-r-md">
      <div className="hidden transform rotate-90 phoneV:block phoneH:hidden">
        Телефон вертикаль
      </div>
      <div className="hidden transform -rotate-90 phoneH:block tablet:hidden">
        Телефон горизонт
      </div>
      <div className="hidden transform -rotate-90 tablet:block laptop:hidden">
        Планшет
      </div>
      <div className="hidden transform -rotate-90 laptop:block desktop:hidden">
        Ноутбук
      </div>
      <div className="hidden transform -rotate-90 desktop:block">Компьютер</div>
    </div>
  )
}

export default DeviceCheck
