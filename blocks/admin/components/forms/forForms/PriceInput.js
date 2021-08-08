const PriceInput = ({ value, onChange, required = false, className }) => {
  if (!parseInt(value)) value = 0
  return (
    <div className={'flex flex-col w-32' + (className ? ' ' + className : '')}>
      <label htmlFor="price">Стоимость</label>
      <div className="flex w-full border border-gray-700 rounded-lg flex-nowrap">
        <input
          className="flex-1 w-24 px-2 py-1 bg-gray-200 rounded-l-lg"
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
