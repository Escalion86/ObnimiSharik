import { useState } from 'react'

import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'

import { ComboBox, Input } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import findDataWithId from '@helpers/findDataWithId'
import DatePicker from './forForms/DatePicker'

const ProductCirculationForm = ({
  productCirculation = DEFAULT_PRODUCT_CIRCULATION,
  products = [],
  afterConfirm = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    productId: productCirculation.productId,
    count: productCirculation.count,
    orderId: productCirculation.orderId,
    purchase: productCirculation.purchase,
    purchasedAt: productCirculation.purchasedAt,
  })

  const forNew = productCirculation._id === undefined

  const product = findDataWithId(products, form.productId)

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
            '/api/productcirculations',
            form,
            afterConfirm,
            'Движение товара (' +
              product.article +
              ') "' +
              product.name +
              '" создано',
            'Ошибка при создании движения товара (' +
              product.article +
              ') "' +
              product.name +
              '"'
          )
        : putData(
            `/api/productcirculations/${productCirculation._id}`,
            form,
            afterConfirm,
            'Движение товара ("' +
              product.article +
              ') "' +
              product.name +
              '" изменено',
            'Ошибка при редактировании движения товара (' +
              product.article +
              ') "' +
              product.name +
              '"'
          )
    } else {
      setErrors(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.productId) err.productId = 'Введите товар'
    if (!form.count) err.count = 'Введите количество'
    if (!form.purchasedAt) err.purchasedAt = 'Введите дату закупа/продажи'

    // if (!form.images) err.image = 'Image URL is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        forNew ? 'Создние движения товара' : 'Редактирование движения товара'
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={Object.keys(formValidate()).length !== 0}
    >
      <ComboBox
        name="productId"
        title="Товар"
        handleChange={handleChange}
        defaultValue={form.productId}
        placeholder="Выберите товар"
        items={products.map((product) => {
          return {
            name:
              (product.article
                ? '(' + product.article + ') '
                : '(без артикула) ') + product.name,
            value: product._id,
          }
        })}
        required
      />
      <Input
        key="count"
        label="Количество"
        type="number"
        name="count"
        value={form.count}
        onChange={handleChange}
        required
      />
      <ComboBox
        name="purchase"
        title="Закуп/Продажа"
        handleChange={handleChange}
        defaultValue={form.purchase}
        items={[
          { name: 'Закуп', value: false },
          { name: 'Продажа', value: true },
        ]}
      />
      <DatePicker
        key="purchasedAt"
        label="Дата закупа/продажи"
        name="purchasedAt"
        value={form.purchasedAt}
        // value={productCirculation.createdAt}
        onChange={handleChange}
        required
      />
    </Form>
  )
}

export default ProductCirculationForm
