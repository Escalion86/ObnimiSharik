import { useEffect, useState } from 'react'
import CheckBox from './forms/forForms/CheckBox'

const MultiselectCheckbox = ({
  title = '',
  options,
  onChange = () => {},
  required = false,
  checkAllBtn = false,
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

  useEffect(() => setData(options), [options])

  const checkedAll = !data.find((item) => !item.checked)

  const toggleCheckAll = () => {
    const newData = data.map((item) => {
      return { ...item, checked: !checkedAll }
    })
    setData(newData)
    onChange(newData.filter((x) => x.checked))
  }

  return (
    <div className="max-w-xl">
      <div className="flex">
        <div className="flex-1">
          {title}
          {required && <span className="text-red-700">*</span>}
        </div>
        {checkAllBtn && (
          // <input
          //   readOnly
          //   type="checkbox"
          //   checked={checkedAll}
          //   onClick={() => checkAll(!checkedAll)}
          // />
          // <Checkbox
          //   className="text-primary"
          //   checked={checkedAll}
          //   // color="primary"
          //   onChange={() => checkAll(!checkedAll)}
          //   // inputProps={{ 'aria-label': 'indeterminate checkbox' }}
          // />
          // <label className="inline-flex items-center">
          //   <input
          //     className="border-gray-400 form-checkbox"
          //     type="checkbox"
          //     checked={checkedAll}
          //     onChange={() => checkAll(!checkedAll)}
          //   />
          //   <span className="ml-2">Option 1</span>
          // </label>
          <CheckBox
            checked={checkedAll}
            onClick={toggleCheckAll}
            small
            label="Все"
            labelPos="left"
          />
        )}
      </div>
      <div className="overflow-hidden bg-gray-200 border border-gray-700 rounded-lg max-h-40">
        <div className="px-2 py-1 overflow-y-scroll max-h-40">
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center">
              <CheckBox
                checked={item.checked || false}
                onClick={() => toggle(index)}
                small
                label={item.label}
              />
              {/* <div className="ml-2">{item.label}</div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MultiselectCheckbox
