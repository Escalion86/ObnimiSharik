import { useState } from 'react'

import { DEFAULT_INVITATION, ROLES } from '@helpers/constants'

import { ComboBox, Input } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'

const InvitationForm = ({
  loggedUser,
  invitation = DEFAULT_INVITATION,
  afterConfirm = () => {},
  onClose = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    email: invitation.email,
    status: invitation.status,
    role: invitation.role,
  })

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = invitation._id === undefined
  const handleChange = (e) => {
    const target = e.target
    const value = target.name === 'images' ? [target.value] : target.value
    const name = target.name

    updateForm({ [name]: value })
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidate()
    const formEmail = form.email.toLowerCase()
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/invitations',
            { ...form, email: formEmail },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Приглашение для "' + formEmail + '" создано и отправлно',
            'Ошибка при создании пришлашения для "' + formEmail + '"'
          )
        : putData(
            `/api/invitations/${invitation._id}`,
            { ...form, email: formEmail },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Приглашение для "' + formEmail + '" изменено',
            'Ошибка при редактировании приглашения для "' + formEmail + '"'
          )
    } else {
      setErrors(errs)
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
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 ||
        compareObjects(form, invitation)
      }
    >
      <Input
        key="email"
        label="EMail сотрудника"
        type="text"
        maxLength="80"
        value={form.email}
        onChange={(email) => updateForm({ email })}
        required
      />
      <ComboBox
        name="role"
        title="Должность"
        onChange={(role) => updateForm({ role })}
        defaultValue={form.role}
        placeholder="Выберите должность"
        items={ROLES.filter((role) => !role.hidden)}
        required
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
