import { useState } from 'react'

const MultiselectCheckbox = ({
  title = '',
  options,
  onChange,
  required = false,
}) => {
  const [data, setData] = useState(options)

  const toggle = (index) => {
    const newData = [...data]
    newData.splice(index, 1, {
      id: data[index].id,
      label: data[index].label,
      checked: !data[index].checked,
    })
    setData(newData)
    onChange(newData.filter((x) => x.checked))
  }

  return (
    <div>
      <div className="">
        {title}
        {required && <span className="text-red-700">*</span>}
      </div>
      <div className="overflow-hidden bg-gray-200 border border-gray-700 rounded-lg max-h-40">
        <div className="px-2 py-1 overflow-y-scroll max-h-40">
          {data.map((item, index) => (
            <label key={item.label} className="flex items-center">
              <input
                readOnly
                type="checkbox"
                checked={item.checked || false}
                onClick={() => toggle(index)}
              />
              <div className="ml-2">{item.label}</div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MultiselectCheckbox
