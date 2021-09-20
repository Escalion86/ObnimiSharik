import { useState } from 'react'

import { DEFAULT_SET } from '@helpers/constants'

import MultiselectCheckbox from '@admincomponents/MultiselectCheckbox'

import { ProductList, Input, PriceInput, InputImages } from './forForms'

import { sendImage, deleteImages } from '@helpers/cloudinary'
import { postData, putData } from '@helpers/CRUD'

import compareArrays from '@helpers/compareArrays'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'
import { useSelector } from 'react-redux'

const SetForm = ({ set = DEFAULT_SET, afterConfirm = () => {} }) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    article: set.article,
    name: set.name,
    description: set.description,
    price: set.price,
    images: set.images,
    typesId: set.typesId,
    productsIdCount: set.productsIdCount,
    archive: set.archive,
  })

  const { products, setTypes } = useSelector((state) => state)

  const afterConfirmUpd = (data) => {
    deleteImages(compareArrays(set.images, form.images).removed)
    afterConfirm(data)
  }

  const forNew = set._id === undefined

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
    // Убираем невыбранные товары и с количеством 0
    const productsIdCount = {}
    for (const [id, count] of Object.entries(form.productsIdCount)) {
      if (id !== '?' && count > 0) productsIdCount[id] = count
    }
    // form.productsIdCount.filter(
    //   (productIdCount) =>
    //     productIdCount.id &&
    //     productIdCount.id !== '0' &&
    //     productIdCount.count > 0
    // )
    const fixedForm = { ...form, productsIdCount }

    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/sets',
            fixedForm,
            afterConfirmUpd,
            'Набор "' + form.name + '" создан',
            'Ошибка при создании набора "' + form.name + '"'
          )
        : putData(
            `/api/sets/${set._id}`,
            fixedForm,
            afterConfirmUpd,
            'Набор "' + form.name + '" изменен',
            'Ошибка при редактировании набора "' + form.name + '"'
          )
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
      title={forNew ? 'Создние набора' : 'Редактирование набора'}
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 || compareObjects(form, set)
      }
      twoCols={true}
    >
      <div className="flex-1 min-w-76">
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
        <MultiselectCheckbox
          title="Типы"
          options={setTypes.map((type) => {
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
            // console.log('checked', data)
          }}
        />
      </div>
      <div className="flex-1 min-w-76">
        <ProductList
          products={products}
          // productsIdCount={[
          //   { id: '610bc814cab8460eb0ffc858', count: 1 },
          //   { id: '610bc814cab8460eb0ffc85c', count: 2 },
          //   { id: '610bc814cab8460eb0ffc857', count: 3 },
          // ]}
          productsIdCount={form.productsIdCount}
          onChange={(newProductsIdCount) =>
            setForm({
              ...form,
              productsIdCount: newProductsIdCount,
            })
          }
        />
        {/* <SelectProductModal products={products} /> */}
        {/* <MultiselectCheckbox
        title="Товары в наборе"
        options={products.map((product) => {
          return {
            label: product.name,
            id: product._id,
            checked: form.productsId.includes(product._id),
          }
        })}
        onChange={(data) => {
          setForm({
            ...form,
            productsId: data.map((product) => product.id),
          })
          // console.log('checked', data)
        }}
      /> */}
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
      </div>
    </Form>
  )
}

export default SetForm
