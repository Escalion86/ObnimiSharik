import MultiselectCheckbox from '@admincomponents/MultiselectCheckbox'
import React, { useEffect, useState } from 'react'
import Slider from '@admincomponents/Slider'
import FilterButtons from './forFilter/FilterButtons'
import compareObjects from '@helpers/compareObjects'

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

  const priceFilterExists =
    state.filter[variable].price !== undefined && filter.price !== undefined
  const countFilterExists =
    state.filter[variable].count !== undefined && filter.count !== undefined
  const productTypesFilterExists =
    state.filter[variable].productTypes !== undefined &&
    filter.productTypes !== undefined
  const setTypesFilterExists =
    state.filter[variable].setTypes !== undefined &&
    filter.setTypes !== undefined
  const purchaseFilterExists =
    state.filter[variable].purchase !== undefined &&
    filter.purchase !== undefined

  let maxPrice = 0
  let minPrice = 0
  let sliderPriceValue = [0, 0]

  if (state[variable] && state[variable].length > 0 && priceFilterExists) {
    maxPrice =
      state[variable].reduce(function (prev, current) {
        return prev.price > current.price ? prev : current
      }).price / 100
    minPrice =
      state[variable].reduce(function (prev, current) {
        return prev.price < current.price ? prev : current
      }).price / 100
    sliderPriceValue = [
      filter.price[0] === null ? minPrice : filter.price[0],
      filter.price[1] === null ? maxPrice : filter.price[1],
    ]
  }

  let maxCount = 0
  let minCount = 0
  let sliderCountValue = [0, 0]

  if (state[variable] && state[variable].length > 0 && countFilterExists) {
    maxCount = state[variable].reduce(function (prev, current) {
      return prev.count > current.count ? prev : current
    }).count
    minCount = state[variable].reduce(function (prev, current) {
      return prev.count < current.count ? prev : current
    }).count
    sliderCountValue = [
      filter.count[0] === null ? minCount : filter.count[0],
      filter.count[1] === null ? maxCount : filter.count[1],
    ]
  }

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
        'absolute z-20 w-full duration-500 top-0 flex items-start gap-4 p-2 transform bg-white border-b border-gray-200' +
        (show ? '' : ' scale-y-0 -translate-y-1/2')
      }
    >
      {productTypesFilterExists && (
        <MultiselectCheckbox
          className="h-full"
          title="Типы"
          options={state.productTypes.map((type) => {
            return {
              label: type.name,
              id: type._id,
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
                  : types.map((item) => item.id),
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
              label: type.name,
              id: type._id,
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
                  : types.map((item) => item.id),
            })
          }
        />
      )}
      {purchaseFilterExists && (
        <MultiselectCheckbox
          className="h-12"
          title="Закуп/продажа"
          options={[
            {
              label: 'Закуп',
              id: 0,
              checked: filter.purchase[0],
            },
            {
              label: 'Продажа',
              id: 1,
              checked: filter.purchase[1],
            },
          ]}
          onChange={(types) => {
            if (!types[0].checked && !types[1].checked) {
              setFilter({
                ...filter,
                purchase: [!filter.purchase[0], !filter.purchase[1]],
              })
            } else
              setFilter({
                ...filter,
                purchase: types.map((item) => item.checked),
              })
          }}
          getAll
          noScroll
        />
      )}
      <div className="flex flex-col justify-between flex-1 h-full gap-y-1">
        {priceFilterExists && (
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
