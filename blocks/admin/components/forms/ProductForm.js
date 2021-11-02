import { useState } from 'react'

import { DEFAULT_PRODUCT } from '@helpers/constants'

import MultiselectCheckbox from '@admincomponents/MultiselectCheckbox'

import { Input, PriceInput, InputImages, RowContainer } from './forForms'

import { sendImage, deleteImages } from '@helpers/cloudinary'
import { postData, putData } from '@helpers/CRUD'

import compareArrays from '@helpers/compareArrays'

import Form from './Form'
import { useSelector } from 'react-redux'
import compareObjects from '@helpers/compareObjects'

const ProductForm = ({
  loggedUser,
  product = DEFAULT_PRODUCT,
  afterConfirm = () => {},
  onClose = () => {},
  readOnly = true,
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    article: product.article,
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.images,
    typesId: product.typesId,
    archive: product.archive,
  })

  const updateForm = (data) => setForm({ ...form, ...data })

  const { productTypes } = useSelector((state) => state)

  const afterConfirmUpd = (data) => {
    deleteImages(compareArrays(product.images, form.images).removed)
    afterConfirm(data)
    onClose()
  }

  const forNew = product._id === undefined

  const sendForm = async () => {
    forNew
      ? postData(
          '/api/products',
          form,
          afterConfirmUpd,
          'Товар "' + form.name + '" создан',
          'Ошибка при создании товара "' + form.name + '"'
        )
      : putData(
          `/api/products/${product._id}`,
          form,
          afterConfirmUpd,
          'Товар "' + form.name + '" изменен',
          'Ошибка при редактировании товара "' + form.name + '"'
        )
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      sendForm()
    } else {
      setErrors(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Введите название'
    if (!form.price) err.price = 'Введите сумму'
    // if (!form.images) err.image = 'Image URL is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        readOnly
          ? 'Товар: ' + form.name
          : forNew
          ? 'Создние товара'
          : 'Редактирование товара'
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 ||
        compareObjects(form, product)
      }
      readOnly={readOnly}
    >
      <Input
        key="name"
        label="Название"
        type="text"
        maxLength="80"
        value={form.name}
        onChange={(name) => updateForm({ name })}
        required
        hidden={readOnly}
      />
      <Input
        key="description"
        label="Описание"
        type="text"
        maxLength="600"
        value={form.description}
        onChange={(description) => updateForm({ description })}
        textarea
        readOnly={readOnly}
      />
      <RowContainer>
        <Input
          key="article"
          label="Артикул"
          type="text"
          maxLength="100"
          value={form.article}
          onChange={(article) => updateForm({ article })}
          className="flex-1"
          readOnly={readOnly}
          inLine={readOnly}
        />
        <PriceInput
          value={form.price}
          onChange={(price) => updateForm({ price })}
          required
          className="flex-1"
          readOnly={readOnly}
          inLine={readOnly}
        />
      </RowContainer>
      <MultiselectCheckbox
        title="Типы"
        options={productTypes.map((type) => {
          return {
            name: type.name,
            value: type._id,
            checked: form.typesId.includes(type._id),
          }
        })}
        onChange={(data) => {
          updateForm({ typesId: data.map((type) => type.value) })
        }}
        readOnly={readOnly}
      />
      <InputImages
        images={form.images}
        label="Картинки"
        onChange={(images) => updateForm({ images })}
        readOnly={readOnly}
        directory="products"
      />
    </Form>
  )
}
export default ProductForm
