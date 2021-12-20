import { useEffect, useState } from 'react'

import { DEFAULT_DISTRICT } from '@helpers/constants'

import { Input, PriceInput, RowContainer } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import formValidator from '@helpers/formValidator'
import districtsSchema from '@schemas/districtsSchema'
import compareObjects from '@helpers/compareObjects'

// import { HuePicker } from 'react-color'

const DistrictForm = ({
  loggedUser,
  district = DEFAULT_DISTRICT,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const initialFormState = {
    name: district.name,
    deliveryPrice: district.deliveryPrice,
    svg: district.svg,
  }

  const [form, setForm] = useState(initialFormState)

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = district._id === undefined

  const accessToContent = loggedUser.access.districts
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(district) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, districtsSchema)
    if (Object.keys(errs).length === 0) {
      setSubmiting(true)
      forNew
        ? postData(
            '/api/districts',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Район "' + form.name + '" создан',
            () => setSubmiting(false),
            'Ошибка при создании района "' + form.name + '"'
          )
        : putData(
            `/api/districts/${district._id}`,
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Район "' + form.name + '" изменен',
            () => setSubmiting(false),
            'Ошибка при редактировании района "' + form.name + '"'
          )
    } else {
      setErrors(errs)
    }
  }

  const isFormChanged = !compareObjects(form, initialFormState, true)

  useEffect(() => {
    setFormChanged(isFormChanged)
  }, [isFormChanged])

  console.log(`form`, form)
  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        forNew
          ? 'Создние района'
          : editMode
          ? 'Редактирование района'
          : 'Район: ' + form.name
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      errors={errors}
      buttonDisabled={!isFormChanged}
      readOnly={readOnly}
      submiting={submiting}
    >
      {!readOnly && (
        <Input
          key="name"
          label="Название"
          type="text"
          maxLength="80"
          value={form.name}
          onChange={(name) => updateForm({ name })}
          required
        />
      )}
      <PriceInput
        label="Стоимость доставки"
        value={form.deliveryPrice}
        onChange={(deliveryPrice) => updateForm({ deliveryPrice })}
        name="deliveryPrice"
        readOnly={readOnly}
      />
      {!readOnly && loggedUser.role === 'dev' && (
        <div className="flex flex-col overflow-hidden border border-gray-600 rounded-lg">
          <div className="px-2 py-1 bg-blue-200 border-b border-gray-600">
            SVG параметры для карты на главной странице сайта
          </div>
          <div className="px-1 py-1 ">
            <Input
              key="d"
              label="d"
              type="text"
              // maxLength="80"
              value={form.svg?.d}
              onChange={(d) => updateForm({ svg: { ...form.svg, d } })}
            />
            <RowContainer>
              <Input
                key="textX"
                label="textX"
                type="number"
                name="textX"
                value={form.svg?.textX}
                onChange={(textX) =>
                  updateForm({ svg: { ...form.svg, textX } })
                }
                className="w-24"
              />
              <Input
                key="textY"
                label="textY"
                type="number"
                name="textX"
                value={form.svg?.textY}
                onChange={(textY) =>
                  updateForm({ svg: { ...form.svg, textY } })
                }
                className="w-24"
              />
            </RowContainer>
          </div>
          {/* <div className="flex items-center px-1 py-2 gap-x-2">
            <div className="">Цвет</div>
            <HuePicker
              color={form.svg?.color}
              onChangeComplete={(e) =>
                updateForm({ svg: { ...form.svg, color: e.hex.slice(1) } })
              }
              pointer={() => (
                <div
                  style={{
                    backgroundColor: form.svg?.color
                      ? '#' + form.svg?.color
                      : 'transparent',
                    width: 22,
                    height: 22,
                    borderRadius: 10,
                    borderColor: 'black',
                    borderWidth: 1,
                    transform: `translateX(-50%) translateY(-3px)`,
                  }}
                ></div>
              )}
            />
            <Input
              key="hex"
              label="hex"
              type="text"
              maxLength="6"
              value={form.svg?.color}
              onChange={(hex) =>
                updateForm({ svg: { ...form.svg, color: hex } })
              }
              prefix="#"
              inLine
              labelStyle="w-auto"
              inputStyle="ml-1 w-22"
              maxLength={6}
            />
          </div> */}
        </div>
      )}
    </Form>
  )
}

export default DistrictForm
