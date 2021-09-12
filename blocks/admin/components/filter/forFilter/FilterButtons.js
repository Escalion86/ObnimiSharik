import Button from '@components/Button'
import compareObjects from '@helpers/compareObjects'
import { initialState as filterInitialState } from '@state/reducers/filterReducer'
import { useDispatch } from 'react-redux'
import { setFilter as actionSetFilter } from '@state/actions/filterActions'

const FilterButtons = ({
  data,
  variable,
  filter,
  setFilter,
  setHideFilter,
}) => {
  const dispatch = useDispatch()

  return (
    <div className="flex justify-end gap-2">
      {!compareObjects(data.filter[variable], filterInitialState[variable]) && (
        <Button
          onClick={() => {
            setFilter(filterInitialState[variable])
            setHideFilter()
            dispatch(
              actionSetFilter({ [variable]: filterInitialState[variable] })
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
          dispatch(actionSetFilter({ [variable]: filter }))
        }}
        name="Применить фильтр"
        small
        inverse
        // disabled={buttonDisabled}
        className="max-w-md"
        disabled={
          filter.productTypes?.length === 0 ||
          filter.setTypes?.length === 0 ||
          compareObjects(data.filter[variable], filter)
        }
      />
    </div>
  )
}

export default FilterButtons
