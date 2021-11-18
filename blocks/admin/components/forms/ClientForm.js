import { useState } from 'react'

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

const ClientForm = ({
  loggedUser,
  client = DEFAULT_CLIENT,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
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
  })

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = client._id === undefined

  const accessToContent = loggedUser.access.clients
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(client) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/clients',
            { ...form, email: form.email.toLowerCase() },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Клиент "' + form.name + '" создан',
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
            'Ошибка при редактировании клиента "' + form.name + '"'
          )
    } else {
      setErrors(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    if (!form.phone) err.phone = 'Phone is required'
    else if (form.phone.length <= 11) err.phone = 'Wrong phone'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        (forNew ? 'Создние' : editMode ? 'Редактирование' : 'Просмотр') +
        ' клиента'
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 || compareObjects(form, client)
      }
      readOnly={readOnly}
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
