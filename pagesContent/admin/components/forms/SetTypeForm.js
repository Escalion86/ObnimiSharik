import { useEffect, useState } from 'react'

import { DEFAULT_SET_TYPE } from '@helpers/constants'

import { CheckBox, Input } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'
import InputImage from './forForms/InputImage'
import setTypesSchema from '@schemas/setTypesSchema'
import formValidator from '@helpers/formValidator'

const SetTypeForm = ({
  loggedUser,
  setType = DEFAULT_SET_TYPE,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const initialFormState = {
    name: setType.name,
    description: setType.description,
    image: setType.image,
    cardSizeOnSite: setType.cardSizeOnSite,
    archive: setType.archive,
    showOnSite: setType.showOnSite,
  }

  const [form, setForm] = useState(initialFormState)

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = setType._id === undefined

  const accessToContent = loggedUser.access.setTypes
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(setType) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, setTypesSchema)
    if (Object.keys(errs).length === 0) {
      setSubmiting(true)
      forNew
        ? postData(
            '/api/settypes',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Тип набора "' + form.name + '" создан',
            () => setSubmiting(false),
            'Ошибка при создании типа набора "' + form.name + '"'
          )
        : putData(
            `/api/settypes/${setType._id}`,
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Тип набора "' + form.name + '" изменен',
            () => setSubmiting(false),
            'Ошибка при редактировании типа набора "' + form.name + '"'
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
          ? 'Создние типа набора'
          : editMode
          ? 'Редактирование типа набора'
          : 'Тип набора: ' + setType.name
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
      <InputImage
        image={form.image}
        label="Картинка"
        onChange={(imageUrl) => updateForm({ image: imageUrl })}
        noImage={`/img/noImage.jpg`}
        inLine
        directory="set_types"
        imageName={setType._id}
        noEditButton
        readOnly={readOnly}
      />
      <CheckBox
        label="Показывать на сайте"
        checked={form.showOnSite}
        onChange={() => updateForm({ showOnSite: !form.showOnSite })}
        readOnly={readOnly}
      />
    </Form>
  )
}

export default SetTypeForm
