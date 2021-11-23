import { useEffect, useState } from 'react'

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
import paymentsSchema from 'schemas/paymentsSchema'
import formValidator from '@helpers/formValidator'

const PaymentForm = ({
  loggedUser,
  payment = DEFAULT_PAYMENT,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const initialFormState = {
    number: payment.number,
    clientId: payment.clientId,
    orderId: payment.orderId,
    payType: payment.payType,
    sum: payment.sum,
    status: payment.status,
    payAt: payment.payAt ?? new Date().toISOString(),
  }

  const [form, setForm] = useState(initialFormState)

  console.log(`form`, form)

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = payment._id === undefined

  const accessToContent = loggedUser.access.payments
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(payment) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, paymentsSchema)
    if (Object.keys(errs).length === 0) {
      setSubmiting(true)
      forNew
        ? postData(
            '/api/payments',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Новая транзакция создана',
            () => setSubmiting(false),
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
            () => setSubmiting(false),
            'Ошибка при редактировании транзакции №' + form.number
          )
    } else {
      setErrors(errs)
    }
  }

  const isFormChanged = !compareObjects(form, initialFormState, true)

  useEffect(() => {
    setFormChanged(isFormChanged)
  }, [isFormChanged])

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        forNew
          ? 'Создние транзакции'
          : editMode
          ? 'Редактирование транзакции №' + form.number
          : 'Транзакция №' + form.number
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      errors={errors}
      buttonDisabled={!isFormChanged}
      readOnly={readOnly}
      submiting={submiting}
    >
      <SelectOrder
        onChange={(order) => {
          if (!form.clientId)
            updateForm({ orderId: order._id, clientId: order.clientId })
          else updateForm({ orderId: order._id })
        }}
        selectedId={form.orderId}
        // clearButton
        required
        // exceptedIds={selectedItemsIds}
        readOnly={readOnly}
      />
      <SelectClient
        onChange={(client) => updateForm({ clientId: client._id })}
        selectedId={form.clientId}
        required
        className="flex-1"
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
