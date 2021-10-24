import InputImage from './InputImage'

const InputAvatar = ({
  avatar = null,
  gender = 'male',
  onChange = () => {},
  required = false,
  readOnly = false,
}) => (
  <InputImage
    image={avatar}
    label="Аватар"
    onChange={onChange}
    noEditButton
    noImage={`/img/users/${gender}.jpg`}
    required={required}
    readOnly={readOnly}
  />
)

export default InputAvatar
