import { useEffect, useState } from 'react'

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
import usersSchema from '@schemas/usersSchema'
import formValidator from '@helpers/formValidator'

const UserForm = ({
  loggedUser,
  user = DEFAULT_USER,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const initialFormState = {
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
  }

  const [form, setForm] = useState(initialFormState)

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = user._id === undefined

  const accessToContent = loggedUser.access.users
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(user) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, usersSchema)
    if (Object.keys(errs).length === 0) {
      setSubmiting(true)
      forNew
        ? postData(
            '/api/users',
            { ...form, email: form.email.toLowerCase() },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Пользователь "' + form.name + '" создан',
            () => setSubmiting(false),
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
            () => setSubmiting(false),
            'Ошибка при редактировании пользователя "' + form.name + '"'
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
        ' сотрудника'
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      errors={errors}
      buttonDisabled={!isFormChanged}
      readOnly={readOnly}
      submiting={submiting}
    >
      <InputAvatar
        user={form}
        onChange={(imageUrl) => updateForm({ image: imageUrl })}
        readOnly={readOnly}
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
        readOnly={readOnly}
        link={form.email ? 'mailto:' + form.email : null}
      />
      <Input
        key="name"
        label="Имя"
        type="text"
        maxLength="80"
        value={form.name}
        onChange={(name) => updateForm({ name })}
        required
        readOnly={readOnly}
      />
      <ComboBox
        title="Должность"
        onChange={(role) => updateForm({ role })}
        defaultValue={form.role}
        placeholder="Выберите должность"
        items={ROLES.filter(
          (role) => loggedUser.role === 'dev' || !role.hidden
        )}
        required
        readOnly={readOnly}
      />

      <RowContainer>
        <PhoneInput
          key="phone"
          label="Телефон"
          value={form.phone}
          onChange={(phone) => updateForm({ phone })}
          // required
          readOnly={readOnly}
          link={form.phone ? 'tel:+' + form.phone : null}
        />
        <PhoneInput
          key="whatsapp"
          label="WhatsApp"
          value={form.whatsapp}
          onChange={(whatsapp) => updateForm({ whatsapp })}
          // required
          readOnly={readOnly}
          link={form.whatsapp ? 'https://wa.me/' + form.whatsapp : null}
        />
      </RowContainer>
      <RowContainer>
        <PhoneInput
          key="viber"
          label="Viber"
          value={form.viber}
          onChange={(viber) => updateForm({ viber })}
          // required
          readOnly={readOnly}
          link={form.viber ? 'viber://chat?number=' + form.viber : null}
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
          readOnly={readOnly}
          link={form.telegram ? 'https://t.me/' + form.telegram : null}
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
          readOnly={readOnly}
          link={
            form.instagram ? 'https://instagram.com/' + form.instagram : null
          }
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
          readOnly={readOnly}
          link={form.vk ? 'https://vk.com/' + form.vk : null}
        />
      </RowContainer>
      <div className="flex">
        <DatePicker
          key="birthday"
          label="День рождения"
          value={form.birthday}
          // value={productCirculation.createdAt}
          onChange={(birthday) => updateForm({ birthday })}
          readOnly={readOnly}
        />
        {form.birthday && (
          <div className={'italic' + (readOnly ? ' ml-3' : ' ml-2 mt-7')}>
            {birthDateToAge(form.birthday)}
          </div>
        )}
      </div>
      <GenderPicker
        gender={form.gender}
        onChange={(gender) => updateForm({ gender })}
        inLine
        readOnly={readOnly}
      />
    </Form>
  )
}

export default UserForm
