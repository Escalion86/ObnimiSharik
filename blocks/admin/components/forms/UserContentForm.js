import { useState } from 'react'

// import { DEFAULT_USER, ROLES } from '@helpers/constants'

import {
  DatePicker,
  GenderPicker,
  Input,
  PhoneInput,
  // ComboBox,
} from './forForms'

import { putData } from '@helpers/CRUD'

import Form from './Form'
import roleRus from '@helpers/roleRus'
import compareObjects from '@helpers/compareObjects'
import InputAvatar from './forForms/InputAvatar'
import formValidator from '@helpers/formValidator'
import usersSchema from '@schemas/usersSchema'

const UserContentForm = ({
  loggedUser,
  afterConfirm = () => {},
  onClose = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const [form, setForm] = useState({
    _id: loggedUser._id,
    image: loggedUser.image,
    email: loggedUser.email,
    name: loggedUser.name,
    phone: loggedUser.phone,
    whatsapp: loggedUser.whatsapp,
    viber: loggedUser.viber,
    telegram: loggedUser.telegram,
    gender: loggedUser.gender,
    birthday: loggedUser.birthday,
    role: loggedUser.role,
  })

  const updateForm = (data) => setForm({ ...form, ...data })

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, usersSchema)
    if (Object.keys(errs).length === 0) {
      setSubmiting(true)
      putData(
        `/api/users/${loggedUser._id}`,
        form,
        (data) => {
          afterConfirm(data)
          onClose()
        },
        'Данные учетной записи обновлены',
        () => setSubmiting(false),
        'Ошибка при обновлении данных учетной записи'
      )
    } else {
      setErrors(errs)
    }
  }

  const isFormChanged = !compareObjects(form, loggedUser, true)

  // useEffect(() => {
  //   setFormChanged(isFormChanged)
  // }, [isFormChanged])

  return (
    <Form
      handleSubmit={handleSubmit}
      buttonName="Применить изменения"
      errors={errors}
      buttonDisabled={!isFormChanged}
      submiting={submiting}
    >
      <div className="flex">
        <div className="w-1/4 min-w-24 max-w-40">Должность</div>
        <div className="italic">{roleRus(loggedUser.role)}</div>
      </div>
      {/* <ComboBox
        title="Должность"
        onChange={(role) => updateForm({ role })}
        defaultValue={form.role}
        placeholder="Выберите должность"
        items={ROLES.filter(
          (role) => !role.hidden || loggedUser.role === 'dev'
        )}
        required
      /> */}
      <InputAvatar
        user={form}
        onChange={(imageUrl) => updateForm({ image: imageUrl })}
        inLine
      />
      <Input
        key="email"
        label="EMail"
        type="text"
        maxLength="80"
        value={form.email}
        onChange={(email) => updateForm({ email })}
        required
        disabled
        inLine
      />
      <Input
        key="name"
        label="Имя"
        type="text"
        maxLength="80"
        value={form.name}
        onChange={(name) => updateForm({ name })}
        required
        inLine
      />
      {/* <ComboBox
        name="role"
        title="Должность"
        handleChange={handleChange}
        defaultValue={form.role}
        placeholder="Выберите должность"
        items={ROLES.filter((role) => !role.hidden)}
        required
        disabled
        inLine
      /> */}

      <PhoneInput
        key="phone"
        label="Телефон"
        value={form.phone}
        onChange={(phone) => updateForm({ phone })}
        // required
        inLine
      />
      <PhoneInput
        key="whatsapp"
        label="WhatsApp"
        value={form.whatsapp}
        onChange={(whatsapp) => updateForm({ whatsapp })}
        // required
        inLine
      />
      <PhoneInput
        key="viber"
        label="Viber"
        value={form.viber}
        onChange={(viber) => updateForm({ viber })}
        // required
        inLine
      />
      <Input
        inputStyle="max-w-40"
        key="telegram"
        label="Telegram"
        type="text"
        maxLength="80"
        value={form.telegram}
        onChange={(telegram) => updateForm({ telegram })}
        inLine
      />
      <DatePicker
        key="birthday"
        label="День рождения"
        value={form.birthday}
        onChange={(birthday) => updateForm({ birthday })}
        inLine
      />
      <GenderPicker
        gender={form.gender}
        onChange={(gender) => updateForm({ gender })}
        inLine
      />
      {/* <div className="flex flex-col">
        <label htmlFor="role">Должность</label>
        <select
          name="role"
          className="px-2 py-1 bg-gray-200 border border-gray-700 rounded-lg"
          onChange={handleChange}
          defaultValue={form.role}
        >
          <option>Выберите должность</option>
          <option value="admin">Администратор</option>
          <option value="aerodesigner">Аэродизайнер</option>
          <option value="deliver">Курьер</option>
        </select>
      </div> */}
    </Form>
  )
}

export default UserContentForm
