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

const UserForm = ({
  role,
  user = DEFAULT_USER,
  afterConfirm = () => {},
  onClose = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    email: user.email,
    name: user.name,
    phone: user.phone,
    whatsapp: user.whatsapp,
    viber: user.viber,
    telegram: user.telegram,
    gender: user.gender,
    role: user.role,
    birthday: user.birthday,
  })

  const forNew = user._id === undefined

  const handleChange = (e) => {
    const { value, name } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/users',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Пользователь "' + form.name + '" создан',
            'Ошибка при создании пользователя "' + form.name + '"'
          )
        : putData(
            `/api/users/${user._id}`,
            form,
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
      <Input
        key="email"
        label="EMail"
        type="text"
        maxLength="80"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        disabled
      />
      <Input
        key="name"
        label="Имя"
        type="text"
        maxLength="80"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <ComboBox
        name="role"
        title="Должность"
        handleChange={handleChange}
        defaultValue={form.role}
        placeholder="Выберите должность"
        items={ROLES.filter((role) => !role.hidden)}
        required
      />

      <RowContainer>
        <PhoneInput
          key="phone"
          label="Телефон"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          // required
        />
        <PhoneInput
          key="whatsapp"
          label="WhatsApp"
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          // required
        />
      </RowContainer>
      <RowContainer>
        <PhoneInput
          key="viber"
          label="Viber"
          name="viber"
          value={form.viber}
          onChange={handleChange}
          // required
        />
        <Input
          key="telegram"
          label="Telegram"
          inputStyle="max-w-40"
          type="text"
          maxLength="80"
          name="telegram"
          value={form.telegram}
          onChange={handleChange}
        />
      </RowContainer>
      <div className="flex">
        <DatePicker
          key="birthday"
          label="День рождения"
          name="birthday"
          value={form.birthday}
          // value={productCirculation.createdAt}
          onChange={handleChange}
        />
        {form.birthday && (
          <div className="ml-2 mt-7">{birthDateToAge(form.birthday)}</div>
        )}
      </div>
      <GenderPicker
        gender={form.gender}
        onChange={(gender) =>
          setForm({
            ...form,
            gender,
          })
        }
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

export default UserForm
