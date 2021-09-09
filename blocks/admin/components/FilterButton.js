import { faFilter } from '@fortawesome/free-solid-svg-icons'
import TitleButton from './TitleButton'

const FilterButton = ({ key, onClick, active }) => (
  <TitleButton
    onClick={onClick}
    icon={faFilter}
    key={key}
    active={active}
    // warning={data.filter.products.show}
  />
)

export default FilterButton
