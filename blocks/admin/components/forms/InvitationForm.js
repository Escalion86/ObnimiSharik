import { useEffect, useState } from 'react'

import { DEFAULT_INVITATION, ROLES } from '@helpers/constants'

import { ComboBox, Input } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'
import formValidator from '@helpers/formValidator'
import invitationsSchema from '@schemas/invitationsSchema'

const InvitationForm = ({
  loggedUser,
  invitation = DEFAULT_INVITATION,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const initialFormState = {
    email: invitation.email,
    status: invitation.status,
    role: invitation.role,
  }

  const [form, setForm] = useState(initialFormState)

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = invitation._id === undefined

  const accessToContent = loggedUser.access.invitations
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(invitation) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, invitationsSchema)
    const formEmail = form.email.toLowerCase()
    if (Object.keys(errs).length === 0) {
      setSubmiting(true)
      forNew
        ? postData(
            '/api/invitations',
            { ...form, email: formEmail },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Приглашение для "' + formEmail + '" создано и отправлно',
            () => setSubmiting(false),
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
            () => setSubmiting(false),
            'Ошибка при редактировании приглашения для "' + formEmail + '"'
          )
    } else {
      setErrors(errs)
    }
  }

  const isFormChanged = !compareObjects(form, initialFormState, true)

  useEffect(() => {
    setFormChanged(isFormChanged)
  }, [isFormChanged])

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        (forNew ? 'Создние' : editMode ? 'Редактирование' : 'Просмотр') +
        ' приглашения'
      }
      buttonName={forNew ? 'Создать и отправить' : 'Применить'}
      errors={errors}
      buttonDisabled={!isFormChanged}
      readOnly={readOnly}
      submiting={submiting}
    >
      <Input
        key="email"
        label="EMail сотрудника"
        type="text"
        maxLength="80"
        value={form.email}
        onChange={(email) => updateForm({ email })}
        required
        readOnly={readOnly}
      />
      <ComboBox
        name="role"
        title="Должность"
        onChange={(role) => updateForm({ role })}
        defaultValue={form.role}
        placeholder="Выберите должность"
        items={ROLES.filter((role) => !role.hidden)}
        required
        readOnly={readOnly}
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
