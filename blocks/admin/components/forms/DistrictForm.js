import { useEffect, useState } from 'react'

import { DEFAULT_DISTRICT } from '@helpers/constants'

import { Input, PriceInput } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import formValidator from '@helpers/formValidator'
import districtsSchema from 'schemas/districtsSchema'

const DistrictForm = ({
  loggedUser,
  district = DEFAULT_DISTRICT,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const [form, setForm] = useState({
    name: district.name,
    deliveryPrice: district.deliveryPrice,
  })

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = district._id === undefined

  const accessToContent = loggedUser.access.districts
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(district) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, districtsSchema)
    if (Object.keys(errs).length === 0) {
      setSubmiting(true)
      forNew
        ? postData(
            '/api/districts',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Район "' + form.name + '" создан',
            () => setSubmiting(false),
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
            () => setSubmiting(false),
            'Ошибка при редактировании района "' + form.name + '"'
          )
    } else {
      setErrors(errs)
    }
  }

  const isFormChanged = !compareObjects(form, district, true)

  useEffect(() => {
    setFormChanged(isFormChanged)
  }, [isFormChanged])

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        forNew
          ? 'Создние района'
          : editMode
          ? 'Редактирование района'
          : 'Район: ' + form.name
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      errors={errors}
      buttonDisabled={!isFormChanged}
      readOnly={readOnly}
      submiting={submiting}
    >
      {!readOnly && (
        <Input
          key="name"
          label="Название"
          type="text"
          maxLength="80"
          value={form.name}
          onChange={(name) => updateForm({ name })}
          required
        />
      )}
      <PriceInput
        label="Стоимость доставки"
        value={form.deliveryPrice}
        onChange={(deliveryPrice) => updateForm({ deliveryPrice })}
        name="deliveryPrice"
        readOnly={readOnly}
      />
    </Form>
  )
}

export default DistrictForm
