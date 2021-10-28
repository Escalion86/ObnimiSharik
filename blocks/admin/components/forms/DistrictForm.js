import { useState } from 'react'

import { DEFAULT_DISTRICT } from '@helpers/constants'

import { Input, PriceInput } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'

const DistrictForm = ({
  loggedUser,
  district = DEFAULT_DISTRICT,
  afterConfirm = () => {},
  onClose = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: district.name,
    deliveryPrice: district.deliveryPrice,
  })

  const forNew = district._id === undefined

  const handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = name === 'deliveryPrice' ? target.value * 100 : target.value
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
            '/api/districts',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Район "' + form.name + '" создан',
            'Ошибка при создании района "' + form.name + '"'
          )
        : putData(
            `/api/districts/${district._id}`,
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Район "' + form.name + '" изменен',
            'Ошибка при редактировании района "' + form.name + '"'
          )
    } else {
      setErrors(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Введите название района'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={forNew ? 'Создние района' : 'Редактирование района'}
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={Object.keys(formValidate()).length !== 0}
    >
      <Input
        key="name"
        label="Название"
        type="text"
        maxLength="80"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <PriceInput
        label="Стоимость доставки"
        value={form.deliveryPrice / 100}
        onChange={handleChange}
        className="flex-1"
        name="deliveryPrice"
      />
    </Form>
  )
}

export default DistrictForm
