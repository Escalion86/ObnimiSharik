import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GenderPicker = ({
  gender,
  label = 'Пол',
  onChange = null,
  inLine = false,
  className = null,
  labelStyle = null,
  name = 'gender',
  required = false,
}) => (
  <div
    className={
      'flex' +
      (inLine ? ' flex-row items-center' : ' flex-col') +
      (className ? ' ' + className : '')
    }
  >
    {label && (
      <label
        className={
          labelStyle
            ? ' ' + labelStyle
            : inLine
            ? 'min-w-24 max-w-40 w-1/4'
            : ''
        }
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>
    )}
    <div className="flex gap-x-2 flex-nowrap">
      <div
        className={
          'flex items-center justify-center border px-2 py-1 rounded-lg cursor-pointer gap-x-2 flex-nowrap' +
          (gender === 'male'
            ? ' text-white bg-blue-400 border-blue-400'
            : ' text-blue-400 bg-white border-gray-400')
        }
        onClick={() => onChange('male')}
      >
        <FontAwesomeIcon icon={faMars} size="lg" />
        <div className={gender === 'male' ? 'text-white' : 'text-gray-400'}>
          Мужчина
        </div>
      </div>
      <div
        className={
          'flex items-center justify-center border px-2 py-1 rounded-lg cursor-pointer gap-x-2 flex-nowrap' +
          (gender === 'famale'
            ? ' text-white bg-red-400 border-red-400'
            : ' text-red-400 bg-white border-gray-400')
        }
        onClick={() => onChange('famale')}
      >
        <FontAwesomeIcon icon={faVenus} size="lg" />
        <div className={gender === 'famale' ? 'text-white' : 'text-gray-400'}>
          Женщина
        </div>
      </div>
    </div>
  </div>
)

export default GenderPicker
