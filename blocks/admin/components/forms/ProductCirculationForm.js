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
      title={
        (forNew ? 'Создние' : editMode ? 'Редактирование' : 'Просмотр') +
        ' движения товара'
      }
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
      <div className="flex flex-wrap justify-between gap-x-2">
        <PriceInput
          label="Стоимость всего"
          value={form.price}
          onChange={(price) => updateForm({ price })}
          // required
          readOnly={readOnly}
          // className="w-40"
        />
        {/* <div className="flex flex-col justify-end mb-2">
          <FontAwesomeIcon
            className="w-4 h-4 text-black"
            icon={faDivide}
            size="lg"
          />
        </div> */}
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
        {/* <div className="flex flex-col justify-end w-4 mb-2">
          <FontAwesomeIcon
            className="w-4 h-4 text-black"
            icon={faEquals}
            size="lg"
          />
        </div> */}
        <div className="flex flex-col justify-end flex-1 mb-1 whitespace-nowrap">
          {form.count != '0' &&
            `за шт: ${Math.round(form.price / form.count) / 100} ₽`}
        </div>
      </div>

      {/* <ComboBox
        title="Пополнение/Расход"
        onChange={(purchase) => updateForm({ purchase })}
        defaultValue={form.purchase}
        items={[
          { name: 'Пополнение склада', value: false },
          { name: 'Расход со склада', value: true },
        ]}
      /> */}
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
      <DatePicker
        key="purchasedAt"
        label="Дата закупа/продажи"
        value={form.purchasedAt}
        onChange={(purchasedAt) => updateForm({ purchasedAt })}
        required
        readOnly={readOnly}
      />
      {!form.purchase && (
        <CheckBox
          label="Брак"
          checked={form.defective}
          // name="defective"
          onChange={() => updateForm({ defective: !form.defective })}
          readOnly={readOnly}
        />
      )}
      <SelectOrder
        onChange={(item) => updateForm({ orderId: item ? item._id : '' })}
        selectedId={form.orderId}
        clearButton
        readOnly={readOnly}
        // required
        // exceptedIds={selectedItemsIds}
      />
    </Form>
  )
}

export default ProductCirculationForm
