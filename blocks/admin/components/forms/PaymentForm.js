import { useState } from 'react'

import { DEFAULT_PAYMENT, ROLES } from '@helpers/constants'

import {
  ComboBox,
  Input,
  SelectOrder,
  SelectClient,
  PriceInput,
} from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'
import PayTypePicker from './forForms/PropValuePicker/PayTypePicker'

const PaymentForm = ({
  loggedUser,
  payment = DEFAULT_PAYMENT,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    number: payment.number,
    clientId: payment.clientId,
    orderId: payment.orderId,
    payType: payment.payType,
    sum: payment.sum,
    status: payment.status,
    payAt: payment.payAt,
  })

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = payment._id === undefined

  const accessToContent = loggedUser.access.payments
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(payment) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/payments',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Новая транзакция создана',
            'Ошибка при создании транзакции'
          )
        : putData(
            `/api/payments/${payment._id}`,
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Транзакция №' + form.number + ' изменена',
            'Ошибка при редактировании транзакции №' + form.number
          )
    } else {
      setErrors(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.clientId) err.clientId = 'clientId is required'
    if (!form.orderId) err.orderId = 'orderId is required'
    if (!form.sum) err.sum = 'sum is required'
    if (!form.payType) err.payType = 'payType is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        (forNew ? 'Создние' : editMode ? 'Редактирование' : 'Просмотр') +
        ' транзакции'
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 ||
        compareObjects(form, payment)
      }
      readOnly={readOnly}
    >
      <SelectClient
        onChange={(client) => updateForm({ clientId: client._id })}
        selectedId={form.clientId}
        required
        className="flex-1"
        // exceptedIds={selectedItemsIds}
        readOnly={readOnly}
      />
      <SelectOrder
        onChange={(order) => updateForm({ orderId: order._id })}
        selectedId={form.orderId}
        // clearButton
        required
        // exceptedIds={selectedItemsIds}
        readOnly={readOnly}
      />
      <PayTypePicker
        payType={form.payType}
        onChange={(payType) => updateForm({ payType })}
        inLine
        required
        readOnly={readOnly}
      />
      <PriceInput
        value={form.sum}
        name="sum"
        label="Сумма"
        onChange={(sum) => updateForm({ sum })}
        required
        className="flex-1"
        inLine
        // readOnly={readOnly}
        // inLine={readOnly}
        readOnly={readOnly}
      />
    </Form>
  )
}

export default PaymentForm
