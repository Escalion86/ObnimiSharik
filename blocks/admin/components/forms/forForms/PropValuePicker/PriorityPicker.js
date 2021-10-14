import { PRIORITIES } from '@helpers/constants'
import PropValuePicker from './PropValuePicker'

const PriorityPicker = ({
  priority,
  onChange = null,
  inLine = false,
  className = null,
  labelStyle = null,
  required = false,
  readOnly = false,
}) => (
  <PropValuePicker
    value={priority}
    valuesArray={PRIORITIES}
    label="Приоритет"
    onChange={onChange}
    inLine={inLine}
    className={className}
    labelStyle={labelStyle}
    name="priority"
    required={required}
    readOnly={readOnly}
  />
)

export default PriorityPicker
