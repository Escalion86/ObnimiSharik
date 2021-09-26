import { useState } from 'react'

import { DEFAULT_CLIENT } from '@helpers/constants'

import { ComboBox, DatePicker, Input, PhoneInput } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'

const ClientForm = ({
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
    birthday: client.birthday,
    image: client.image,
  })

  const forNew = client._id === undefined

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
    e?.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/clients',
            form,

            () => {
              afterConfirm()
              onClose()
            },
            'Клиент "' + form.name + '" создан',
            'Ошибка при создании клиента "' + form.name + '"'
          )
        : putData(
            `/api/clients/${client._id}`,
            form,
            () => {
              afterConfirm()
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
    // if (!form.email) err.email = 'Email is required'
    // if (!form.role) err.role = 'Role is required'
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
      <div className="flex">
        <div className="flex-1">
          <PhoneInput
            key="phone"
            label="Телефон"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <PhoneInput
            key="whatsapp"
            label="WhatsApp"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
          />
        </div>
      </div>

      <DatePicker
        key="birthday"
        label="День рождения"
        name="birthday"
        value={form.birthday}
        // value={productCirculation.createdAt}
        onChange={handleChange}
      />
      {/* <ComboBox
        name="role"
        title="Должность"
        handleChange={handleChange}
        defaultValue={form.role}
        placeholder="Выберите должность"
        items={ROLES.filter((role) => !role.hidden)}
        required
      /> */}
    </Form>
  )
}

export default ClientForm
