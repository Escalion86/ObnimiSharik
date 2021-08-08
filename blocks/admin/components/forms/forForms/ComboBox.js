const ComboBox = ({
  name,
  title,
  defaultValue = '',
  handleChange,
  placeholder,
  items,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name}>{title}</label>
    <select
      name={name}
      className="px-2 py-1 bg-gray-200 border border-gray-700 rounded-lg"
      onChange={handleChange}
      defaultValue={defaultValue}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {items.map((item, index) => (
        <option key={'combo' + index} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
)

export default ComboBox
