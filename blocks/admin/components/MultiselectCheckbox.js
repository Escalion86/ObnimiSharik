import { useState } from 'react'

const MultiselectCheckbox = ({ title = '', options, onChange }) => {
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
      <div className="">{title}</div>
      <div className="overflow-y-scroll max-h-40">
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
  )
}

export default MultiselectCheckbox