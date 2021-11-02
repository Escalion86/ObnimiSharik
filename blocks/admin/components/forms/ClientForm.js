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
import birthDateToAge from '@helpers/birthDateToAge'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ClientForm = ({
  loggedUser,
  client = DEFAULT_CLIENT,
  afterConfirm = () => {},
  onClose = () => {},
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

  const handleChange = (e) => {
    const target = e.target
    const value = target.name === 'images' ? [target.value] : target.value
    const name = target.name

    updateForm({ [name]: value })
  }

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
      title={forNew ? 'Создние клиента' : 'Редактирование клиента'}
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 || compareObjects(form, client)
      }
    >
      <Input
        key="name"
        label="Имя клиента"
        type="text"
        maxLength="80"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        key="email"
        label="EMail клиента"
        type="text"
        maxLength="80"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <RowContainer>
        <PhoneInput
          key="phone"
          label="Телефон"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <PhoneInput
          key="whatsapp"
          label="WhatsApp"
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
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
      <RowContainer>
        <Input
          key="instagram"
          label="Instagram"
          inputStyle="max-w-40"
          type="text"
          maxLength="80"
          name="instagram"
          value={form.instagram}
          onChange={handleChange}
          prefix="@"
        />
        <Input
          key="vk"
          label="ВКонтакте"
          inputStyle="max-w-40"
          type="text"
          maxLength="80"
          name="vk"
          value={form.vk}
          onChange={handleChange}
          prefix="@"
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
        onChange={(gender) => updateForm({ gender })}
        inLine
      />
    </Form>
  )
}

export default ClientForm
