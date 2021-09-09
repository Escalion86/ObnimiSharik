import Button from '@components/Button'
import compareObjects from '@helpers/compareObjects'
import { initialState as filterInitialState } from '@state/reducers/filterReducer'
import { useDispatch } from 'react-redux'
import { setFilter as actionSetFilter } from '@state/actions/filterActions'

const FilterButtons = ({
  data,
  filterName,
  filter,
  setFilter,
  setHideFilter,
}) => {
  const dispatch = useDispatch()

  return (
    <div className="flex justify-end gap-2">
      {!compareObjects(
        data.filter[filterName],
        filterInitialState[filterName]
      ) && (
        <Button
          onClick={() => {
            setFilter(filterInitialState[filterName])
            setHideFilter()
            dispatch(
              actionSetFilter({ [filterName]: filterInitialState[filterName] })
            )
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
          dispatch(actionSetFilter({ [filterName]: filter }))
        }}
        name="Применить фильтр"
        small
        inverse
        // disabled={buttonDisabled}
        className="max-w-md"
        disabled={
          filter.productTypes?.length === 0 ||
          filter.setTypes?.length === 0 ||
          compareObjects(data.filter[filterName], filter)
        }
      />
    </div>
  )
}

export default FilterButtons
