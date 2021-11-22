import MultiselectCheckbox from '@admincomponents/MultiselectCheckbox'
import React, { useEffect, useState } from 'react'
import Slider from '@admincomponents/Slider'
import FilterButtons from './forFilter/FilterButtons'
import compareObjects from '@helpers/compareObjects'

const minMaxSet = (stateVariable, filterVariable, func = (num) => num) => {
  let max = 0
  let min = 0

  if (stateVariable && stateVariable.length > 0) {
    max = stateVariable.reduce(function (prev, current) {
      return prev[filterVariable] > current[filterVariable] ? prev : current
    })[filterVariable]
    min = stateVariable.reduce(function (prev, current) {
      return prev[filterVariable] < current[filterVariable] ? prev : current
    })[filterVariable]
  }
  return [func(min), func(max)]
}

const Filter = ({
  state,
  variable,
  show = false,
  setHideFilter = () => {},
}) => {
  const [filter, setFilter] = useState(state.filter[variable])

  useEffect(() => {
    if (!compareObjects(state.filter[variable], filter))
      setFilter(state.filter[variable])
  }, [variable, state.filter[variable]])

  const filterExists = (key) =>
    state.filter[variable][key] !== undefined && filter[key] !== undefined

  const priceFilterExists = filterExists('price')
  const countFilterExists = filterExists('count')
  const productTypesFilterExists = filterExists('productTypes')
  const setTypesFilterExists = filterExists('setTypes')
  const purchaseFilterExists = filterExists('purchase')
  const statusFilterExists = filterExists('status')
  const priorityFilterExists = filterExists('priority')
  const genderFilterExists = filterExists('gender')
  const payTypeFilterExists = filterExists('payType')
  const sumFilterExists = filterExists('sum')

  const [minPrice, maxPrice] = priceFilterExists
    ? minMaxSet(state[variable], 'price', (num) => num / 100)
    : [0, 0]
  const sliderPriceValue = priceFilterExists
    ? [
        filter.price[0] === null ? minPrice : filter.price[0],
        filter.price[1] === null ? maxPrice : filter.price[1],
      ]
    : [0, 0]

  const [minCount, maxCount] = countFilterExists
    ? minMaxSet(state[variable], 'count')
    : [0, 0]
  const sliderCountValue = countFilterExists
    ? [
        filter.count[0] === null ? minCount : filter.count[0],
        filter.count[1] === null ? maxCount : filter.count[1],
      ]
    : [0, 0]

  const [minSum, maxSum] = sumFilterExists
    ? minMaxSet(state[variable], 'sum', (num) => num / 100)
    : [0, 0]
  const sliderSumValue = sumFilterExists
    ? [
        filter.sum[0] === null ? minSum : filter.sum[0],
        filter.sum[1] === null ? maxSum : filter.sum[1],
      ]
    : [0, 0]

  const onChangeSlider = (event, value, filterParam, minValue, maxValue) => {
    setFilter({
      ...filter,
      [filterParam]: [
        value[0] <= minValue ? null : value[0],
        value[1] >= maxValue ? null : value[1],
      ],
    })
  }

  return (
    <div
      className={
        'absolute z-20 w-full duration-500 top-0 flex gap-4 p-2 transform bg-white border-b border-gray-200' +
        (show ? '' : ' scale-y-0 -translate-y-1/2')
      }
    >
      {productTypesFilterExists && (
        <MultiselectCheckbox
          className="h-full"
          title="Типы"
          options={state.productTypes.map((type) => {
            return {
              name: type.name,
              value: type._id,
              checked:
                filter.productTypes === null
                  ? true
                  : filter.productTypes.includes(type._id),
            }
          })}
          checkAllBtn
          onChange={(types) =>
            setFilter({
              ...filter,
              productTypes:
                types.length === state.productTypes.length
                  ? null
                  : types.map((item) => item.value),
            })
          }
        />
      )}
      {setTypesFilterExists && (
        <MultiselectCheckbox
          className="h-full"
          title="Типы"
          options={state.setTypes.map((type) => {
            return {
              name: type.name,
              value: type._id,
              checked:
                filter.setTypes === null
                  ? true
                  : filter.setTypes.includes(type._id),
            }
          })}
          checkAllBtn
          onChange={(types) =>
            setFilter({
              ...filter,
              setTypes:
                types.length === state.setTypes.length
                  ? null
                  : types.map((item) => item.value),
            })
          }
        />
      )}
      {purchaseFilterExists && (
        <MultiselectCheckbox
          className="h-20"
          title="Пополнение/Расход"
          options={[
            {
              name: 'Расход',
              value: 0,
              checked: filter.purchase[0],
            },
            {
              name: 'Пополнение',
              value: 1,
              checked: filter.purchase[1],
            },
          ]}
          onChange={(items) => {
            if (!items[0].checked && !items[1].checked) {
              setFilter({
                ...filter,
                purchase: [!filter.purchase[0], !filter.purchase[1]],
              })
            } else
              setFilter({
                ...filter,
                purchase: items.map((item) => item.checked),
              })
          }}
          getAll
          noScroll
        />
      )}
      {statusFilterExists && (
        <MultiselectCheckbox
          title="Статус"
          options={filter.status}
          onChange={(status) => {
            setFilter({
              ...filter,
              status,
            })
          }}
          getAll
          // noScroll
        />
      )}
      {priorityFilterExists && (
        <MultiselectCheckbox
          title="Приоритет"
          options={filter.priority}
          onChange={(priority) => {
            setFilter({
              ...filter,
              priority,
            })
          }}
          getAll
          noScroll
        />
      )}
      {genderFilterExists && (
        <MultiselectCheckbox
          title="Пол"
          options={filter.gender}
          onChange={(gender) => {
            setFilter({
              ...filter,
              gender,
            })
          }}
          getAll
          noScroll
        />
      )}
      {payTypeFilterExists && (
        <MultiselectCheckbox
          title="Тип"
          options={filter.payType}
          onChange={(payType) => {
            setFilter({
              ...filter,
              payType,
            })
          }}
          getAll
          noScroll
        />
      )}

      <div className="flex flex-col justify-between flex-1 gap-y-1">
        <div>
          {priceFilterExists && (
            // || fullPriceFilterExists
            <div>
              <div>Стоимость</div>
              <Slider
                value={sliderPriceValue}
                onChange={(event, value) =>
                  onChangeSlider(event, value, 'price', minPrice, maxPrice)
                }
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                max={maxPrice || 0}
                min={minPrice || 0}
                // getAriaValueText={valuetext}
              />
            </div>
          )}
          {sumFilterExists && (
            // || fullPriceFilterExists
            <div>
              <div>Сумма</div>
              <Slider
                value={sliderSumValue}
                onChange={(event, value) =>
                  onChangeSlider(event, value, 'sum', minSum, maxSum)
                }
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                max={maxSum || 0}
                min={minSum || 0}
                // getAriaValueText={valuetext}
              />
            </div>
          )}
          {countFilterExists && (
            <div>
              <div>Количество</div>
              <Slider
                value={sliderCountValue}
                onChange={(event, value) =>
                  onChangeSlider(event, value, 'count', minCount, maxCount)
                }
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                max={maxCount || 0}
                min={minCount || 0}
                // getAriaValueText={valuetext}
              />
            </div>
          )}
        </div>
        <FilterButtons
          state={state}
          variable={variable}
          filter={filter}
          setFilter={setFilter}
          setHideFilter={setHideFilter}
        />
        {/* <div className="flex justify-end gap-2">
          {!compareObjects(
            data.filter.products,
            filterInitialState.products
          ) && (
            <Button
              onClick={() => {
                setFilter(filterInitialState.products)
                setHideFilter()
                dispatch(setProductsFilter(filterInitialState.products))
              }}
              name="Сбросить фильтр"
              small
              inverse
              className="max-w-md"
              type="cancel"
            />
          )}
          <Button
            onClick={() => {
              setHideFilter()
              dispatch(setProductsFilter(filter))
            }}
            name="Применить фильтр"
            small
            inverse
            // disabled={buttonDisabled}
            className="max-w-md"
            disabled={
              filter.types?.length === 0 ||
              compareObjects(data.filter.products, filter)
            }
          />
        </div> */}
      </div>
    </div>
  )
}

export default Filter
