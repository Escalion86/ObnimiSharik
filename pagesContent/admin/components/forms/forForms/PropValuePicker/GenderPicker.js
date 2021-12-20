import { GENDERS } from '@helpers/constants'
import PropValuePicker from './PropValuePicker'

const GenderPicker = ({
  gender,
  onChange = null,
  inLine = false,
  className = null,
  labelStyle = null,
  required = false,
  readOnly = false,
}) => (
  <PropValuePicker
    value={gender}
    valuesArray={GENDERS}
    label="Пол"
    onChange={onChange}
    inLine={inLine}
    className={className}
    labelStyle={labelStyle}
    name="gender"
    required={required}
    readOnly={readOnly}
  />
)

export default GenderPicker
