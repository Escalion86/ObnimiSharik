import { useEffect, useRef, useState } from 'react'

import { DEFAULT_ORDER, ROLES } from '@helpers/constants'

import { ComboBox, Input, ProductsList, SetsList } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'

import { useSelector } from 'react-redux'
{
  /* <FontAwesomeIcon
        className={
          'w-6 h-6 text-gray-700 hover:scale-110 transform duration-200'
        }
        onClick={(e) => {
          e.stopPropagation()
          toggleSearchMode()
        }}
        icon={isSearchMode ? faTimes : faSearch}
      /> */
}

const OrderForm = ({ order = DEFAULT_ORDER, afterConfirm = () => {} }) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [form, setForm] = useState({
    number: order.number,
    clientId: order.clientId,
    productsCount: order.productsCount,
    setsCount: order.setsCount,
    discount: order.discount,
    fullPrice: order.fullPrice,
    status: order.status,
    deliveryAddress: order.deliveryAddress,
    deliveryDateFrom: order.deliveryDateFrom,
    deliveryDateTo: order.deliveryDateTo,
    deliverId: order.deliverId,
  })

  const { products, sets } = useSelector((state) => state)

  const productsIdCount = {}
  form.productsCount.forEach((productCount) => {
    productsIdCount[productCount.product ? productCount.product._id : '?'] =
      productCount.count
  })
  const setsIdCount = {}
  form.setsCount.forEach((setCount) => {
    setsIdCount[setCount.set ? setCount.set._id : '?'] = setCount.count
  })

  console.log(`form`, form)

  const forNew = order._id === undefined

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
            '/api/orders',
            form,
            afterConfirm,
            'Новый Ззаказ создан',
            'Ошибка при создании заказа для'
          )
        : putData(
            `/api/orders/${order._id}`,
            form,
            afterConfirm,
            'Заказ №' + form.number + ' изменен',
            'Ошибка при редактировании заказа №' + form.number
          )
    } else {
      setErrors(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    // if (!form.email) err.email = 'Email is required'
    // if (!form.role) err.role = 'Role is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={forNew ? 'Создние заказа' : 'Редактирование заказа'}
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 || compareObjects(form, order)
      }
    >
      <ProductsList
        productsIdCount={productsIdCount}
        onChange={(newProductsIdCount) => {
          const tempProductsCount = []
          for (const [id, count] of Object.entries(newProductsIdCount)) {
            tempProductsCount.push({
              product:
                id === '?'
                  ? null
                  : products.find((product) => product._id === id),
              count,
            })
          }
          setForm({
            ...form,
            productsCount: tempProductsCount,
          })
        }}
      />
      <SetsList
        setsIdCount={setsIdCount}
        onChange={(newSetsIdCount) => {
          const tempSetsCount = []
          for (const [id, count] of Object.entries(newSetsIdCount)) {
            tempSetsCount.push({
              set: id === '?' ? null : sets.find((set) => set._id === id),
              count,
            })
          }
          setForm({
            ...form,
            setsCount: tempSetsCount,
          })
        }}
      />
      {/* <Input
        key="email"
        label="EMail сотрудника"
        type="text"
        maxLength="80"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <ComboBox
        name="role"
        title="Должность"
        handleChange={handleChange}
        defaultValue={form.role}
        placeholder="Выберите должность"
        items={ROLES.filter((role) => !role.hidden)}
        required
      /> */}
      {/* <div className="flex flex-col">
        <label htmlFor="role">Должность</label>
        <select
          name="role"
          className="px-2 py-1 bg-gray-200 border border-gray-700 rounded-lg"
          onChange={handleChange}
          defaultValue={form.role}
        >
          <option>Выберите должность</option>
          <option value="admin">Администратор</option>
          <option value="aerodesigner">Аэродизайнер</option>
          <option value="deliver">Курьер</option>
        </select>
      </div> */}
    </Form>
  )
}

export default OrderForm
