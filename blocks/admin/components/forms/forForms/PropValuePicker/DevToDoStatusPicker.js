import { DEVTODO_STATUSES } from '@helpers/constants'
import PropValuePicker from './PropValuePicker'

const DevToDoStatusPicker = ({
  status,
  onChange = null,
  inLine = false,
  className = null,
  labelStyle = null,
  required = false,
}) => (
  <PropValuePicker
    value={status}
    valuesArray={DEVTODO_STATUSES}
    label="Статус"
    onChange={onChange}
    inLine={inLine}
    className={className}
    labelStyle={labelStyle}
    name="status"
    required={required}
  />
)

export default DevToDoStatusPicker
