import { PAY_TYPES } from '@helpers/constants'
import PropValuePicker from './PropValuePicker'

const PayTypePicker = ({
  payType,
  onChange = null,
  inLine = false,
  className = null,
  labelStyle = null,
  required = false,
  readOnly = false,
}) => (
  <PropValuePicker
    value={payType}
    valuesArray={PAY_TYPES}
    label="Тип"
    onChange={onChange}
    inLine={inLine}
    className={className}
    labelStyle={labelStyle}
    name="payType"
    required={required}
    readOnly={readOnly}
    disselectOnSameClick={false}
  />
)

export default PayTypePicker
