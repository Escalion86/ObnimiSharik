import { useState } from 'react'

import { DEFAULT_PRODUCT_TYPE } from '@helpers/constants'

import { Input } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'

const ProductTypeForm = ({
  productType = DEFAULT_PRODUCT_TYPE,
  afterConfirm = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: productType.name,
  })

  const forNew = productType._id === undefined

  const handleChange = (e) => {
    const { value, name } = e.target
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
            '/api/producttypes',
            form,
            afterConfirm,
            'Тип товара "' + form.name + '" создан',
            'Ошибка при создании типа товара "' + form.name + '"'
          )
        : putData(
            `/api/producttypes/${productType._id}`,
            form,
            afterConfirm,
            'Тип товара "' + form.name + '" изменен',
            'Ошибка при редактировании типа товара "' + form.name + '"'
          )
    } else {
      setErrors(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Введите название'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={forNew ? 'Создние типа товара' : 'Редактирование типа товара'}
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 ||
        compareObjects(form, productType)
      }
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
    </Form>
  )
}

export default ProductTypeForm
