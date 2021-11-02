import { useState } from 'react'

import { ROLES, DEFAULT_USER } from '@helpers/constants'

import {
  ComboBox,
  DatePicker,
  GenderPicker,
  Input,
  PhoneInput,
  RowContainer,
} from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'
import birthDateToAge from '@helpers/birthDateToAge'
import InputAvatar from './forForms/InputAvatar'

const UserForm = ({
  loggedUser,
  user = DEFAULT_USER,
  afterConfirm = () => {},
  onClose = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    _id: user._id,
    image: user.image,
    email: user.email,
    name: user.name,
    phone: user.phone,
    whatsapp: user.whatsapp,
    viber: user.viber,
    telegram: user.telegram,
    instagram: user.instagram,
    vk: user.vk,
    gender: user.gender,
    role: user.role,
    birthday: user.birthday,
  })

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = user._id === undefined

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/users',
            { ...form, email: form.email.toLowerCase() },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Пользователь "' + form.name + '" создан',
            'Ошибка при создании пользователя "' + form.name + '"'
          )
        : putData(
            `/api/users/${user._id}`,
            { ...form, email: form.email.toLowerCase() },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Пользователь "' + form.name + '" изменен',
            'Ошибка при редактировании пользователя "' + form.name + '"'
          )
    } else {
      setErrors(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.email) err.email = 'Введите Email'
    if (!form.name) err.name = 'Введите Имя'
    if (!form.role) err.role = 'Укажите должность'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={forNew ? 'Создние сотрудника' : 'Редактирование сотрудника'}
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 || compareObjects(form, user)
      }
    >
      <InputAvatar
        user={form}
        onChange={(imageUrl) => updateForm({ image: imageUrl })}
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
      />
      <Input
        key="name"
        label="Имя"
        type="text"
        maxLength="80"
        value={form.name}
        onChange={(name) => updateForm({ name })}
        required
      />
      <ComboBox
        title="Должность"
        handleChange={(role) => updateForm({ role })}
        defaultValue={form.role}
        placeholder="Выберите должность"
        items={ROLES.filter((role) => !role.hidden)}
        required
      />

      <RowContainer>
        <PhoneInput
          key="phone"
          label="Телефон"
          value={form.phone}
          onChange={(phone) => updateForm({ phone })}
          // required
        />
        <PhoneInput
          key="whatsapp"
          label="WhatsApp"
          value={form.whatsapp}
          onChange={(whatsapp) => updateForm({ whatsapp })}
          // required
        />
      </RowContainer>
      <RowContainer>
        <PhoneInput
          key="viber"
          label="Viber"
          value={form.viber}
          onChange={(viber) => updateForm({ viber })}
          // required
        />
        <Input
          key="telegram"
          label="Telegram"
          inputStyle="max-w-40"
          type="text"
          maxLength="80"
          value={form.telegram}
          onChange={(telegram) => updateForm({ telegram })}
          prefix="@"
        />
      </RowContainer>
      <RowContainer>
        <Input
          key="instagram"
          label="Instagram"
          inputStyle="max-w-40"
          type="text"
          maxLength="80"
          value={form.instagram}
          onChange={(instagram) => updateForm({ instagram })}
          prefix="@"
        />
        <Input
          key="vk"
          label="ВКонтакте"
          inputStyle="max-w-40"
          type="text"
          maxLength="80"
          value={form.vk}
          onChange={(vk) => updateForm({ vk })}
          prefix="@"
        />
      </RowContainer>
      <div className="flex">
        <DatePicker
          key="birthday"
          label="День рождения"
          value={form.birthday}
          // value={productCirculation.createdAt}
          onChange={(birthday) => updateForm({ birthday })}
        />
        {form.birthday && (
          <div className="ml-2 mt-7">{birthDateToAge(form.birthday)}</div>
        )}
      </div>
      <GenderPicker
        gender={form.gender}
        onChange={(gender) => updateForm({ gender })}
        inLine
      />
    </Form>
  )
}

export default UserForm
