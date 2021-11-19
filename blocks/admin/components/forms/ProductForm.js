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
import productsSchema from 'schemas/productsSchema'
import formValidator from '@helpers/formValidator'

const ProductForm = ({
  loggedUser,
  product = DEFAULT_PRODUCT,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    article: product.article,
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.images,
    manufacturer: product.manufacturer,
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

  const accessToContent = loggedUser.access.products
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(product) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

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
    const errs = formValidator(form, productsSchema)
    if (Object.keys(errs).length === 0) {
      sendForm()
    } else {
      setErrors(errs)
    }
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        forNew
          ? 'Создние товара'
          : editMode
          ? 'Редактирование товара'
          : 'Товар: ' + form.name
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={compareObjects(form, product)}
      readOnly={readOnly}
    >
      <RowContainer>
        <Input
          key="name"
          label="Название"
          type="text"
          maxLength="80"
          value={form.name}
          onChange={(name) => updateForm({ name })}
          required
          hidden={readOnly}
          className="col-span-2"
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
          className="col-span-2"
        />
        <Input
          key="manufacturer"
          label="Производитель"
          type="text"
          maxLength="100"
          value={form.manufacturer}
          onChange={(manufacturer) => updateForm({ manufacturer })}
          className="flex-1"
          readOnly={readOnly}
          inLine={readOnly}
          className="col-span-2"
        />
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
          className="col-span-2"
        />
        <InputImages
          images={form.images}
          label="Картинки"
          onChange={(images) => updateForm({ images })}
          readOnly={readOnly}
          directory="products"
          className="col-span-2"
        />
      </RowContainer>
    </Form>
  )
}
export default ProductForm
