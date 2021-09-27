import { useState } from 'react'

import { DEFAULT_USER } from '@helpers/constants'

import { DatePicker, Input, PhoneInput } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import roleRus from '@helpers/roleRus'
import compareObjects from '@helpers/compareObjects'

const UserContentForm = ({
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
    birthday: user.birthday,
  })

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
      putData(
        `/api/users/${user._id}`,
        form,
        (data) => {
          afterConfirm(data)
          onClose()
        },
        'Данные учетной записи обновлены',
        'Ошибка при обновлении данных учетной записи'
      )
    } else {
      setErrors(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.email) err.email = 'Введите Email'
    if (!form.name) err.name = 'Введите Имя'
    // if (!form.role) err.role = 'Укажите должность'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      buttonName="Применить изменения"
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 || compareObjects(form, user)
      }
    >
      <div className="flex">
        <div className="w-24">Должность</div>
        <div className="italic">{roleRus(user.role)}</div>
      </div>
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
        inLine
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
        name="phone"
        value={form.phone}
        onChange={handleChange}
        // required
        inLine
      />
      <PhoneInput
        key="whatsapp"
        label="WhatsApp"
        name="whatsapp"
        value={form.whatsapp}
        onChange={handleChange}
        // required
        inLine
      />
      <DatePicker
        key="birthday"
        label="День рождения"
        name="birthday"
        value={form.birthday}
        // value={productCirculation.createdAt}
        onChange={handleChange}
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
