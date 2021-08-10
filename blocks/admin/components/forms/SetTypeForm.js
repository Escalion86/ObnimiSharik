import { useState } from 'react'

import { DEFAULT_SET_TYPE } from '@helpers/constants'

import { Input } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'

const SetTypeForm = ({
  settype = DEFAULT_SET_TYPE,
  afterConfirm = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: settype.name,
  })

  const forNew = settype._id === undefined

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
            '/api/settypes',
            form,
            afterConfirm,
            'Тип набора "' + form.name + '" создан',
            'Ошибка при создании типа набора "' + form.name + '"'
          )
        : putData(
            `/api/settypes/${settype._id}`,
            form,
            afterConfirm,
            'Тип набора "' + form.name + '" изменен',
            'Ошибка при редактировании типа набора "' + form.name + '"'
          )
    } else {
      setErrors({ errs })
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={forNew ? 'Создние типа набора' : 'Редактирование типа набора'}
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
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

export default SetTypeForm
