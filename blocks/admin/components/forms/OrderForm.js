import { useEffect, useRef, useState } from 'react'

import { DEFAULT_ORDER, ROLES } from '@helpers/constants'

import {
  ComboBox,
  Input,
  PriceInput,
  ProductsList,
  SelectClient,
  SetsList,
} from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'

import { useSelector } from 'react-redux'
import RadioBox from './forForms/RadioBox'
import RowContainer from './forForms/RowContainer'
import { SelectDeliver } from './forForms/SelectItem'
import DateTimePicker from './forForms/DateTimePicker'
import FormColumn from './forForms/FromColumn'

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

const OrderForm = ({
  order = DEFAULT_ORDER,
  afterConfirm = () => {},
  onClose = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    number: order.number,
    clientId: order.clientId,
    productsCount: order.productsCount,
    setsCount: order.setsCount,
    discount: order.discount,
    fullPrice: order.fullPrice,
    status: order.status,
    deliveryPickup: order.deliveryPickup,
    deliveryAddress: order.deliveryAddress,
    deliveryDateFrom: order.deliveryDateFrom,
    deliveryDateTo: order.deliveryDateTo,
    deliverId: order.deliverId,
  })

  const { products, sets, users } = useSelector((state) => state)

  const delivers = users.filter((user) => user.role === 'deliver')

  useEffect(() => {
    if (delivers.length === 1) {
      setForm({
        ...form,
        deliverId: delivers[0]._id,
      })
    }
  }, [])

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
      target.name === 'totalPrice' || target.name === 'discount'
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

  const handleAddressChange = (e) => {
    const { value, name } = e.target

    setForm({
      ...form,
      deliveryAddress: { ...form.deliveryAddress, [name]: value },
    })
  }

  let catalogPrice = 0
  form.productsCount.forEach((productCount) => {
    if (productCount.product)
      catalogPrice +=
        products.find((product) => product._id === productCount.product._id)
          .price * productCount.count
  })
  form.setsCount.forEach((setCount) => {
    if (setCount.set)
      catalogPrice +=
        sets.find((set) => set._id === setCount.set._id).price * setCount.count
  })
  catalogPrice = catalogPrice / 100
  let totalPrice = catalogPrice - form.discount / 100

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/orders',
            { ...form, fullPrice: totalPrice * 100 },
            () => {
              afterConfirm()
              onClose()
            },
            'Новый Ззаказ создан',
            'Ошибка при создании заказа для'
          )
        : putData(
            `/api/orders/${order._id}`,
            { ...form, fullPrice: totalPrice * 100 },
            () => {
              afterConfirm()
              onClose()
            },
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
      twoCols={true}
    >
      <FormColumn>
        <SelectClient
          onChange={(item) =>
            setForm({
              ...form,
              clientId: item._id,
            })
          }
          selectedId={form.clientId}
          required
          // exceptedIds={selectedItemsIds}
        />
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
          required={
            (!setsIdCount['?'] && Object.keys(setsIdCount).length > 0) ||
            (setsIdCount['?'] && Object.keys(setsIdCount).length > 1)
              ? 'star'
              : true
          }
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
          required={
            (!productsIdCount['?'] &&
              Object.keys(productsIdCount).length > 0) ||
            (productsIdCount['?'] && Object.keys(productsIdCount).length > 1)
              ? 'star'
              : true
          }
        />
        <div>Cумма по каталогу: {catalogPrice} ₽</div>
        {/* <PriceInput
          value={form.fullPrice / 100}
          name="fullPrice"
          onChange={handleChange}
          required
          title="Цена для клиента"
          className="flex-1 mt-1"
          labelStyle="w-min pr-1 whitespace-nowrap"
          inLine
        /> */}
        <div className="flex flex-col items-center justify-start mt-1 phoneH:justify-between tablet:flex-row">
          <PriceInput
            value={form.discount / 100}
            onChange={handleChange}
            title="Скидка"
            className="flex-1 w-full"
            name="discount"
            labelStyle="w-min pr-1 whitespace-nowrap"
            inLine
          />
          <div className="flex items-center h-8 font-bold gap-x-1">
            Итого сумма:<span className="text-lg">{totalPrice}</span> ₽
          </div>
        </div>
      </FormColumn>
      <FormColumn>
        <div className="flex gap-x-6">
          <label
            className="min-w-min whitespace-nowrap"
            htmlFor={'deliveryPickup'}
          >
            Тип доставки
          </label>
          <div className="flex flex-wrap gap-x-4">
            <RadioBox
              checked={form.deliveryPickup}
              onClick={(e) =>
                setForm({
                  ...form,
                  deliveryPickup: e.target.value === 'on',
                })
              }
              small
              label="Самовывоз"
              // className="flex-1"
              // labelPos="left"
            />
            <RadioBox
              checked={!form.deliveryPickup}
              onClick={(e) =>
                setForm({
                  ...form,
                  deliveryPickup: e.target.value !== 'on',
                })
              }
              small
              label="Курьером"
              // className="flex-1"
              // labelPos="left"
            />
          </div>
        </div>
        <div
          className={
            'relative duration-300' +
            (form.deliveryPickup ? ' h-16' : ' h-116 tablet:h-80')
          }
        >
          <div
            className={
              'absolute top-0 w-full duration-300 overflow-hidden' +
              (form.deliveryPickup ? ' h-16' : ' h-0 opacity-0')
            }
          >
            <DateTimePicker
              key="deliveryDateFrom"
              label="Самовывоз в"
              name="deliveryDateFrom"
              value={form.deliveryDateFrom}
              // value={productCirculation.createdAt}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className={
              'absolute top-0 w-full duration-300 overflow-hidden' +
              (form.deliveryPickup ? ' opacity-0 h-0' : ' h-116 tablet:h-80')
            }
          >
            <RowContainer className="flex-col justify-between tablet:flex-nowrap min-w-72 tablet:min-w-none tablet:flex-row desktop:max-w-none">
              <DateTimePicker
                key="deliveryDateFrom"
                label="Доставка от"
                name="deliveryDateFrom"
                value={form.deliveryDateFrom}
                // value={productCirculation.createdAt}
                onChange={handleChange}
                required
              />
              <DateTimePicker
                key="deliveryDateTo"
                label="до"
                name="deliveryDateTo"
                value={form.deliveryDateTo}
                // value={productCirculation.createdAt}
                onChange={handleChange}
                required
              />
            </RowContainer>
            <SelectDeliver
              onChange={(item) =>
                setForm({
                  ...form,
                  deliverId: item._id,
                })
              }
              selectedId={form.deliverId}
              required
              // exceptedIds={selectedItemsIds}
            />
            <div>
              <label>
                Адрес<span className="text-red-700">*</span>
              </label>
              <div className="flex flex-col p-1 border border-gray-700 rounded-lg gap-y-2">
                <Input
                  key="town"
                  label="Город"
                  type="text"
                  maxLength="100"
                  name="town"
                  value={form.deliveryAddress.town}
                  onChange={handleAddressChange}
                  className="flex-1"
                  labelStyle="w-18"
                  inLine
                  required
                />
                <Input
                  key="street"
                  label="Улица"
                  type="text"
                  maxLength="100"
                  name="street"
                  value={form.deliveryAddress.street}
                  onChange={handleAddressChange}
                  className="flex-1"
                  labelStyle="w-18"
                  inLine
                  required
                />
                <RowContainer className="flex-col tablet:flex-row gap-y-2">
                  <Input
                    key="entrance"
                    type="text"
                    label="Подъезд"
                    maxLength="100"
                    name="entrance"
                    value={form.deliveryAddress.entrance}
                    onChange={handleAddressChange}
                    inLine
                    labelStyle="w-18 pr-1 tablet:w-min"
                    inputStyle="tablet:w-16"
                  />
                  <Input
                    key="floor"
                    type="text"
                    label="Этаж"
                    maxLength="100"
                    name="floor"
                    value={form.deliveryAddress.floor}
                    onChange={handleAddressChange}
                    // className="w-16"
                    inLine
                    labelStyle="w-18 pr-1 tablet:w-min"
                    inputStyle="tablet:w-16"
                  />
                  <Input
                    key="flat"
                    type="text"
                    label="Квартира"
                    maxLength="100"
                    name="flat"
                    value={form.deliveryAddress.flat}
                    onChange={handleAddressChange}
                    // className="w-16"
                    inLine
                    labelStyle="pr-1 tablet:w-min"
                    inputStyle="tablet:w-16"
                    required
                  />
                </RowContainer>
                <Input
                  key="comment"
                  label="Комментарий"
                  type="text"
                  maxLength="200"
                  name="comment"
                  value={form.deliveryAddress.comment}
                  onChange={handleAddressChange}
                  className="flex flex-1"
                  labelStyle="w-min pr-1"
                  inputStyle="flex-1 w-0"
                  inLine
                />
              </div>
            </div>
          </div>
        </div>
      </FormColumn>
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
