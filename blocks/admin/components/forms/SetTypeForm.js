import { useState } from 'react'

import { DEFAULT_SET_TYPE } from '@helpers/constants'

import { Input } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'

const SetTypeForm = ({
  role,
  setType = DEFAULT_SET_TYPE,
  afterConfirm = () => {},
  onClose = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: setType.name,
  })

  const forNew = setType._id === undefined

  const handleChange = (e) => {
    const { value, name } = e.target
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
            '/api/settypes',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Тип набора "' + form.name + '" создан',
            'Ошибка при создании типа набора "' + form.name + '"'
          )
        : putData(
            `/api/settypes/${setType._id}`,
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Тип набора "' + form.name + '" изменен',
            'Ошибка при редактировании типа набора "' + form.name + '"'
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
      title={forNew ? 'Создние типа набора' : 'Редактирование типа набора'}
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 ||
        compareObjects(form, setType)
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

export default SetTypeForm
