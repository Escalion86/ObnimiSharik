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

  const forNew = payment._id === undefined

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'sum'
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
      title={forNew ? 'Создние транзакции' : 'Редактирование транзакции'}
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 ||
        compareObjects(form, payment)
      }
    >
      <SelectClient
        onChange={(item) =>
          setForm({
            ...form,
            clientId: item._id,
          })
        }
        selectedId={form.clientId}
        required
        className="flex-1"
        // exceptedIds={selectedItemsIds}
      />
      <SelectOrder
        onChange={(item) =>
          setForm({
            ...form,
            orderId: item ? item._id : '',
          })
        }
        selectedId={form.orderId}
        // clearButton
        required
        // exceptedIds={selectedItemsIds}
      />
      <PayTypePicker
        payType={form.payType}
        onChange={(payType) =>
          setForm({
            ...form,
            payType,
          })
        }
        inLine
        required
      />
      <PriceInput
        value={form.sum / 100}
        name="sum"
        label="Сумма"
        onChange={handleChange}
        required
        className="flex-1"
        inLine
        // readOnly={readOnly}
        // inLine={readOnly}
      />
    </Form>
  )
}

export default PaymentForm
