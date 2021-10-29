import InputImage from './InputImage'

const InputAvatar = ({
  user = null, // need _id, gender and image props
  onChange = () => {},
  required = false,
  readOnly = false,
  inLine = false,
}) => (
  <InputImage
    image={user.image}
    label="Аватар"
    onChange={onChange}
    noEditButton
    noImage={`/img/users/${user.gender ?? 'male'}.jpg`}
    required={required}
    readOnly={readOnly}
    inLine={inLine}
    directory="users"
    imageName={user._id}
  />
)

export default InputAvatar
