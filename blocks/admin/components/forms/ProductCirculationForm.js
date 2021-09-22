import { useState } from 'react'

import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'

import { ComboBox, Input, PriceInput } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import findDataWithId from '@helpers/findDataWithId'
import DatePicker from './forForms/DatePicker'
import { useSelector } from 'react-redux'
import compareObjects from '@helpers/compareObjects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEquals } from '@fortawesome/free-solid-svg-icons'

const ProductCirculationForm = ({
  productCirculation = DEFAULT_PRODUCT_CIRCULATION,
  afterConfirm = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    productId: productCirculation.productId,
    count: productCirculation.count,
    price: productCirculation.price,
    orderId: productCirculation.orderId,
    purchase: productCirculation.purchase,
    purchasedAt: productCirculation.purchasedAt,
  })

  const forNew = productCirculation._id === undefined

  const { products } = useSelector((state) => state)

  const product = findDataWithId(products, form.productId)

  const handleChange = (e) => {
    const target = e.target
    const value = target.name === 'price' ? target.value * 100 : target.value
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

  console.log(`form.price`, form.price)

  const formValidate = () => {
    let err = {}
    if (!form.productId) err.productId = 'Введите товар'
    if (!form.count) err.count = 'Введите количество'
    if (!form.price) err.count = 'Введите стоимость'
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
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 ||
        compareObjects(form, productCirculation)
      }
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
      <div className="flex justify-between gap-x-1">
        <PriceInput
          title="Стоимость за шт"
          value={form.price / 100}
          onChange={handleChange}
          required
          className="w-32"
        />
        <div className="flex flex-col justify-end mb-2">
          <FontAwesomeIcon
            className="w-4 h-4 text-black"
            icon={faTimes}
            size="lg"
          />
        </div>
        <Input
          key="count"
          label="Количество"
          type="number"
          name="count"
          value={form.count}
          onChange={handleChange}
          required
          className="w-24"
        />
        <div className="flex flex-col justify-end w-4 mb-2">
          <FontAwesomeIcon
            className="w-4 h-4 text-black"
            icon={faEquals}
            size="lg"
          />
        </div>
        <div className="flex flex-col justify-end flex-1 mb-1">
          {(form.count ? form.count : 0) * (form.price ? form.price / 100 : 0)}{' '}
          ₽
        </div>
      </div>

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
