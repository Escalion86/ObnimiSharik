const PriceInput = ({
  value,
  title = 'Стоимость',
  onChange,
  required = false,
  className,
  inLine,
}) => {
  if (!parseInt(value)) value = 0
  return (
    <div
      className={
        'flex' +
        (inLine ? ' flex-row items-center' : ' flex-col') +
        (className ? ' ' + className : '')
      }
    >
      <label
        className={inLine ? 'min-w-24 max-w-40 w-1/4' : ''}
        htmlFor="price"
      >
        {title}
        {required && <span className="text-red-700">*</span>}
      </label>
      <div
        className={
          'flex w-full border rounded-lg flex-nowrap ' +
          (required && !value ? 'border-red-700' : 'border-gray-700')
        }
      >
        <input
          className="flex-1 w-24 px-2 py-1 bg-gray-200 rounded-l-lg outline-none"
          type="text"
          name="price"
          value={parseInt(value)}
          onChange={onChange}
          required={required}
          onKeyPress={(e) => {
            e = e || window.event
            var charCode = typeof e.which == 'undefined' ? e.keyCode : e.which
            if (!(charCode >= 48 && charCode <= 57)) {
              e.preventDefault()
            }
          }}
        />
        <div className="flex items-center justify-center w-6 bg-gray-300 border-l border-gray-700 rounded-r-lg">
          ₽
        </div>
      </div>
    </div>
  )
}

export default PriceInput
