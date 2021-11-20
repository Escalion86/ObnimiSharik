import { useEffect, useState } from 'react'

import { DEFAULT_PRODUCT_CIRCULATION, ORDER_PURCHASE } from '@helpers/constants'

import {
  CheckBox,
  ComboBox,
  Input,
  PriceInput,
  SelectProduct,
  SelectOrder,
  DatePicker,
} from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import findDataWithId from '@helpers/findDataWithId'
import { useSelector } from 'react-redux'
import compareObjects from '@helpers/compareObjects'
import PropValuePicker from './forForms/PropValuePicker/PropValuePicker'
import productCirculationsSchema from 'schemas/productCirculationsSchema'
import formValidator from '@helpers/formValidator'

const PriceCountInput = ({
  price,
  count,
  onChangePrice,
  onChangeCount,
  readOnly,
}) => {
  const [isLastEditTotalPrice, setIsLastEditTotalPrice] = useState(true)
  const [newPrice, setNewPrice] = useState(price)
  const [newCount, setNewCount] = useState(count)
  const [newPriceForOne, setNewPriceForOne] = useState(
    count ? Math.round(price / count) : 0
  )

  return (
    <div className="flex flex-wrap justify-between gap-x-2">
      <PriceInput
        label="Стоимость всего"
        value={newPrice}
        onChange={(price) => {
          setIsLastEditTotalPrice(true)
          setNewPrice(price)
          setNewPriceForOne(newCount ? Math.round(price / newCount) : 0)
          onChangePrice(price)
        }}
        // required
        readOnly={readOnly}
        // className="w-40"
      />
      <Input
        key="count"
        label="Количество"
        type="number"
        name="count"
        value={newCount}
        onChange={(count) => {
          if (isLastEditTotalPrice)
            setNewPriceForOne(count ? Math.round(newPrice / count) : 0)
          else setNewPrice(count * newPriceForOne)
          setNewCount(count)
          onChangeCount(count)
        }}
        required
        className={!readOnly ? 'w-24' : ''}
        readOnly={readOnly}
      />
      <PriceInput
        label="За 1 шт."
        value={newPriceForOne}
        onChange={(price) => {
          setIsLastEditTotalPrice(false)
          setNewPriceForOne(price)
          setNewPrice(price * newCount)
          onChangePrice(price * newCount)
        }}
        // required
        readOnly={readOnly}
        // className="w-40"
      />
    </div>
  )
}

const ProductCirculationForm = ({
  loggedUser,
  productCirculation = DEFAULT_PRODUCT_CIRCULATION,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
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
    defective: productCirculation.defective,
  })

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = productCirculation._id === undefined

  const accessToContent = loggedUser.access.productCirculations
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(productCirculation) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const { products } = useSelector((state) => state)

  const product = findDataWithId(products, form.productId)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, productCirculationsSchema)
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/productcirculations',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
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
            (data) => {
              afterConfirm(data)
              onClose()
            },
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

  const isFormChanged = !compareObjects(form, productCirculation, true)

  useEffect(() => {
    setFormChanged(isFormChanged)
  }, [isFormChanged])

  return (
    <Form
      handleSubmit={handleSubmit}
      title={`${
        forNew || !editMode
          ? form.purchase
            ? 'Пополнение'
            : 'Расход'
          : 'Редактирование ' + (form.purchase ? 'пополнения' : 'расхода')
      } склада`}
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={!isFormChanged}
      readOnly={readOnly}
    >
      <SelectProduct
        onChange={(product) => updateForm({ productId: product._id })}
        selectedId={form.productId}
        required
        // exceptedIds={selectedItemsIds}
        readOnly={readOnly}
      />
      <PriceCountInput
        price={form.price}
        count={form.count}
        readOnly={readOnly}
        onChangePrice={(price) => updateForm({ price })}
        onChangeCount={(count) => updateForm({ count })}
      />
      {/* <div className="flex flex-wrap justify-between gap-x-2">
        <PriceInput
          label="Стоимость всего"
          value={form.price}
          onChange={(price) => updateForm({ price })}
          // required
          readOnly={readOnly}
          // className="w-40"
        />
        <Input
          key="count"
          label="Кол-во в наборе"
          type="number"
          name="count"
          value={form.count}
          onChange={(count) => updateForm({ count })}
          required
          className={!readOnly ? 'w-34' : ''}
          readOnly={readOnly}
        />
        <div className="flex flex-col justify-end flex-1 mb-1 whitespace-nowrap">
          {form.count != '0' &&
            `за шт: ${Math.round(form.price / form.count) / 100} ₽`}
        </div>
      </div> */}

      {/* <ComboBox
        title="Пополнение/Расход"
        onChange={(purchase) => updateForm({ purchase })}
        defaultValue={form.purchase}
        items={[
          { name: 'Пополнение склада', value: false },
          { name: 'Расход со склада', value: true },
        ]}
      /> */}
      {loggedUser.role === 'dev' && (
        <PropValuePicker
          value={form.purchase}
          valuesArray={ORDER_PURCHASE}
          label="Пополнение/Расход"
          onChange={(purchase) => {
            if (purchase) updateForm({ purchase })
            else updateForm({ purchase, defective: false })
          }}
          // inLine
          // className={className}
          // labelStyle={labelStyle}
          // name="gender"
          required
          readOnly={readOnly}
        />
      )}
      <DatePicker
        key="purchasedAt"
        label={`Дата ${form.purchase ? 'пополнения склада' : 'расхода склада'}`}
        value={form.purchasedAt}
        onChange={(purchasedAt) => updateForm({ purchasedAt })}
        required
        readOnly={readOnly}
      />
      {!form.purchase && (
        <>
          <CheckBox
            label="Брак"
            checked={form.defective}
            // name="defective"
            onChange={() => updateForm({ defective: !form.defective })}
            readOnly={readOnly}
          />

          <SelectOrder
            onChange={(item) => updateForm({ orderId: item ? item._id : '' })}
            selectedId={form.orderId}
            clearButton
            readOnly={readOnly}
            // required
            // exceptedIds={selectedItemsIds}
          />
        </>
      )}
    </Form>
  )
}

export default ProductCirculationForm
