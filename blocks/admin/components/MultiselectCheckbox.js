import { useEffect, useState } from 'react'
import CheckBox from './forms/forForms/CheckBox'

const MultiselectCheckbox = ({
  title = '',
  options,
  onChange = () => {},
  required = false,
  checkAllBtn = false,
  className = null,
  getAll = false,
  noScroll = false,
  readOnly = false,
}) => {
  // const [data, setData] = useState(options)
  const data = options

  const toggle = (index) => {
    const newData = [...data]
    newData.splice(index, 1, {
      value: data[index].value,
      name: data[index].name,
      checked: !data[index].checked,
    })
    // setData(newData)
    onChange(getAll ? newData : newData.filter((x) => x.checked))
  }

  // useEffect(() => {
  // if (!compareObjects(state.filter[variable], filter))
  // setData(options)}, [options])

  const checkedAll = !data.find((item) => !item.checked)

  const toggleCheckAll = () => {
    const newData = data.map((item) => {
      return { ...item, checked: !checkedAll }
    })
    onChange(getAll ? newData : newData.filter((x) => x.checked))
  }

  if (readOnly) {
    const types = data.filter((item) => item.checked)
    return (
      <div
        className={
          (types.length > 0 ? '' : 'flex') + (className ? ' ' + className : '')
        }
      >
        <div className="border-b-1 border-primary max-w-min whitespace-nowrap">
          {title}:
        </div>
        <div className="flex flex-col ml-2 italic">
          {types.length > 0
            ? types.map((item) => <span key={item.name}>- {item.name}</span>)
            : '-'}
        </div>
      </div>
    )
  }

  return (
    <div
      className={'flex flex-col max-w-xl' + (className ? ' ' + className : '')}
    >
      <div className="flex justify-between">
        <div>
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
      <div
        className={
          'flex-1 bg-gray-200 border border-gray-700 rounded-lg overflow-hidden'
        }
        style={{ maxHeight: (data.length >= 8 ? 216 : data.length * 27) + 8 }}
      >
        <div
          className={!noScroll ? ' overflow-y-scroll' : ''}
          style={{ maxHeight: (data.length >= 8 ? 216 : data.length * 27) + 8 }}
        >
          <div className={'px-2 py-1 rounded-lg'}>
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <CheckBox
                  checked={item.checked || false}
                  onClick={() => toggle(index)}
                  small
                  label={item.name}
                />
                {/* <div className="ml-2">{item.label}</div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiselectCheckbox
