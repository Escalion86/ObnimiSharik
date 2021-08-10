import { useState } from 'react'

import { DEFAULT_PRODUCT } from '@helpers/constants'

import MultiselectCheckbox from '@admincomponents/MultiselectCheckbox'

import { Input, PriceInput, InputImages } from './forForms'

import { sendImage, deleteImages } from '@helpers/cloudinary'
import { postData, putData } from '@helpers/CRUD'

import compareArrays from '@helpers/compareArrays'

import toasts from '@helpers/toasts'

import Form from './Form'

const ProductForm = ({
  product = DEFAULT_PRODUCT,
  products = [],
  productTypes = [],
  afterConfirm = () => {},
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

  const afterConfirmUpd = (data) => {
    deleteImages(compareArrays(product.images, form.images).removed)
    afterConfirm(data)
  }

  const forNew = product._id === undefined

  const handleChange = (e) => {
    const target = e.target
    const name = target.name
    // deleteImage('obnimisharik/cmurzvh8hj7e7pcwefvx')
    // if (name === 'image') {
    //   setImages([...images, target.files[0]])
    // } else {
    const value =
      name === 'price'
        ? target.value * 100
        : // : name === 'images'
          // ? [target.value]
          target.value
    setForm({
      ...form,
      [name]: value,
    })
    // }
  }

  // const sendImages = async (images) => {
  //   const images = await Promise.all(
  //     images.map(async (file) => {
  //       const formData = new FormData()
  //       formData.append('file', file)
  //       formData.append('upload_preset', 'obnimisharik')

  //       const res = await fetch(
  //         'https://api.cloudinary.com/v1_1/escalion-ru/image/upload',
  //         {
  //           method: 'POST',
  //           body: formData,
  //         }
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data.secure_url !== '') {
  //             return data.secure_url
  //           }
  //         })
  //         .catch((err) => console.error(err))
  //       return res
  //     })
  //   )

  //   return images
  // }
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
    e.preventDefault()
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
      title={forNew ? 'Создние товара' : 'Редактирование товара'}
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
      <Input
        key="description"
        label="Описание"
        type="text"
        maxLength="600"
        name="description"
        value={form.description}
        onChange={handleChange}
        textarea
      />
      <div className="flex">
        <div className="flex-1">
          <Input
            key="article"
            label="Артикул"
            type="text"
            maxLength="100"
            name="article"
            value={form.article}
            onChange={handleChange}
            className="w-40"
          />
        </div>
        <div className="flex-1">
          <PriceInput
            value={form.price / 100}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      {/* <Input
        key="images"
        label="Ссылка на картинку"
        type="url"
        name="images"
        value={form.images[0]}
        onChange={handleChange}
        required
      /> */}
      <MultiselectCheckbox
        title="Типы"
        options={productTypes.map((type) => {
          return {
            label: type.name,
            id: type._id,
            checked: form.typesId.includes(type._id),
          }
        })}
        onChange={(data) => {
          setForm({
            ...form,
            typesId: data.map((type) => type.id),
          })
        }}
      />
      <InputImages
        images={form.images}
        onChange={(images) =>
          setForm({
            ...form,
            images,
          })
        }
        onAddImage={(image) =>
          sendImage(image, (imageUrl) =>
            setForm({
              ...form,
              images: [...form.images, imageUrl],
            })
          )
        }
      />
      {/* <Input
        key="image"
        label="Картинка"
        type="file"
        name="image"
        // value={form.image}
        onChange={handleChange}
        accept="image/jpeg,image/png"
        required
      /> */}
    </Form>
  )
}
export default ProductForm
