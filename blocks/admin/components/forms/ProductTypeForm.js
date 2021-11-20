import { useEffect, useState } from 'react'

import { DEFAULT_PRODUCT_TYPE } from '@helpers/constants'

import { Input } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'
import InputImage from './forForms/InputImage'
import productTypesSchema from 'schemas/productTypesSchema'
import formValidator from '@helpers/formValidator'

const ProductTypeForm = ({
  loggedUser,
  productType = DEFAULT_PRODUCT_TYPE,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: productType.name,
    image: productType.image,
  })

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = productType._id === undefined

  const accessToContent = loggedUser.access.productTypes
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(productType) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, productTypesSchema)
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/producttypes',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Тип товара "' + form.name + '" создан',
            'Ошибка при создании типа товара "' + form.name + '"'
          )
        : putData(
            `/api/producttypes/${productType._id}`,
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Тип товара "' + form.name + '" изменен',
            'Ошибка при редактировании типа товара "' + form.name + '"'
          )
    } else {
      setErrors(errs)
    }
  }

  const isFormChanged = !compareObjects(form, productType, true)

  useEffect(() => {
    setFormChanged(isFormChanged)
  }, [isFormChanged])

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        forNew
          ? 'Создние типа товара'
          : editMode
          ? 'Редактирование типа товара'
          : 'Тип товара: ' + productType.name
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={!isFormChanged}
      readOnly={readOnly}
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
      <InputImage
        image={form.image}
        label="Картинка"
        onChange={(image) => updateForm({ image })}
        noImage={`/img/no_image.png`}
        inLine
        directory="product_types"
        imageName={productType._id}
        noEditButton
        readOnly={readOnly}
      />
    </Form>
  )
}

export default ProductTypeForm
