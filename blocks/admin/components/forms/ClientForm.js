import { useEffect, useState } from 'react'

import { DEFAULT_CLIENT } from '@helpers/constants'

import {
  DatePicker,
  GenderPicker,
  Input,
  PhoneInput,
  RowContainer,
} from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'
import formValidator from '@helpers/formValidator'
import clientsSchema from '@schemas/clientsSchema'

const ClientForm = ({
  loggedUser,
  client = DEFAULT_CLIENT,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const initialFormState = {
    name: client.name,
    email: client.email,
    phone: client.phone,
    whatsapp: client.whatsapp,
    viber: client.viber,
    telegram: client.telegram,
    instagram: client.instagram,
    vk: client.vk,
    gender: client.gender,
    birthday: client.birthday,
    image: client.image,
  }

  const [form, setForm] = useState(initialFormState)

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = client._id === undefined

  const accessToContent = loggedUser.access.clients
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(client) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, clientsSchema)
    if (Object.keys(errs).length === 0) {
      setSubmiting(true)
      forNew
        ? postData(
            '/api/clients',
            { ...form, email: form.email.toLowerCase() },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Клиент "' + form.name + '" создан',
            () => setSubmiting(false),
            'Ошибка при создании клиента "' + form.name + '"'
          )
        : putData(
            `/api/clients/${client._id}`,
            { ...form, email: form.email.toLowerCase() },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Клиент "' + form.name + '" изменен',
            () => setSubmiting(false),
            'Ошибка при редактировании клиента "' + form.name + '"'
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
        ' клиента'
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      errors={errors}
      buttonDisabled={!isFormChanged}
      readOnly={readOnly}
      submiting={submiting}
    >
      <RowContainer>
        <Input
          key="name"
          label="Имя"
          type="text"
          maxLength="80"
          value={form.name}
          onChange={(name) => updateForm({ name })}
          required
          readOnly={readOnly}
          className="col-span-2"
        />
        <Input
          key="email"
          label="EMail"
          type="text"
          maxLength="80"
          value={form.email}
          onChange={(email) => updateForm({ email })}
          readOnly={readOnly}
          link={form.email ? 'mailto:' + form.email : null}
          className="col-span-2"
        />
        <PhoneInput
          key="phone"
          label="Телефон"
          value={form.phone}
          onChange={(phone) => updateForm({ phone })}
          required
          readOnly={readOnly}
          link={form.phone ? 'tel:+' + form.phone : null}
        />
        <PhoneInput
          key="whatsapp"
          label="WhatsApp"
          value={form.whatsapp}
          onChange={(whatsapp) => updateForm({ whatsapp })}
          readOnly={readOnly}
          link={form.whatsapp ? 'https://wa.me/' + form.whatsapp : null}
        />
        <PhoneInput
          key="viber"
          label="Viber"
          value={form.viber}
          onChange={(viber) => updateForm({ viber })}
          readOnly={readOnly}
          link={form.viber ? 'viber://chat?number=' + form.viber : null}
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
          readOnly={readOnly}
          link={form.telegram ? 'https://t.me/' + form.telegram : null}
        />

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
          onChange={(vk) => updateForm({ v })}
          prefix="@"
          readOnly={readOnly}
          link={form.vk ? 'https://vk.com/' + form.vk : null}
        />
        <DatePicker
          key="birthday"
          label="День рождения"
          value={form.birthday}
          onChange={(value) => updateForm({ birthday: value })}
          readOnly={readOnly}
          showYears
          className="col-span-2"
        />
        <GenderPicker
          gender={form.gender}
          onChange={(gender) => updateForm({ gender })}
          inLine
          readOnly={readOnly}
          className="col-span-2"
        />
      </RowContainer>
    </Form>
  )
}

export default ClientForm
