import { useState } from 'react'

import { DEFAULT_INVITATION, ROLES } from '@helpers/constants'

import { ComboBox, Input } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'

const InvitationForm = ({
  invitation = DEFAULT_INVITATION,
  afterConfirm = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    email: invitation.email,
    status: invitation.status,
    role: invitation.role,
  })

  const forNew = invitation._id === undefined

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'price'
        ? target.value * 100
        : target.name === 'images'
        ? [target.value]
        : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/users/invitations',
            form,
            afterConfirm,
            'Приглашение для "' + form.email + '" создано и отправлно',
            'Ошибка при редактировании пришлашения для "' + form.email + '"'
          )
        : putData(
            `/api/users/invitations/${invitation._id}`,
            form,
            afterConfirm,
            'Приглашение для "' + form.email + '" изменено',
            'Ошибка при редактировании приглашения для "' + form.email + '"'
          )
    } else {
      setErrors({ errs })
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.email) err.email = 'Email is required'
    if (!form.role) err.role = 'Role is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={forNew ? 'Создние приглашения' : 'Редактирование приглашения'}
      buttonName={forNew ? 'Создать и отправить' : 'Применить'}
      message={message}
      errors={errors}
    >
      <Input
        key="email"
        label="EMail сотрудника"
        type="text"
        maxLength="80"
        name="email"
        value={form.email}
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

export default InvitationForm
