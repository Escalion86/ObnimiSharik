import { useEffect, useState } from 'react'

import { DEFAULT_SET } from '@helpers/constants'

import MultiselectCheckbox from '@admincomponents/MultiselectCheckbox'

import {
  Input,
  PriceInput,
  InputImages,
  SelectProductsList,
  FormColumn,
  RowContainer,
  CheckBox,
} from './forForms'

import { sendImage, deleteImages } from '@helpers/cloudinary'
import { postData, putData } from '@helpers/CRUD'

import compareArrays from '@helpers/compareArrays'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'
import { useSelector } from 'react-redux'
import setsSchema from '@schemas/setsSchema'
import formValidator from '@helpers/formValidator'

const SetForm = ({
  loggedUser,
  set = DEFAULT_SET,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const initialFormState = {
    article: set.article,
    name: set.name,
    description: set.description,
    price: set.price,
    images: set.images,
    typesId: set.typesId,
    productsIdCount: set.productsIdCount,
    archive: set.archive,
    showOnSite: set.showOnSite,
  }

  const [form, setForm] = useState(initialFormState)

  const updateForm = (data) => setForm({ ...form, ...data })

  const { setTypes } = useSelector((state) => state)

  const afterConfirmUpd = (data) => {
    deleteImages(compareArrays(set.images, form.images).removed)
    afterConfirm(data)
    onClose()
  }

  const forNew = set._id === undefined

  const accessToContent = loggedUser.access.sets
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(set) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, setsSchema)

    if (Object.keys(errs).length === 0) {
      setSubmiting(true)
      // Убираем невыбранные товары и с количеством 0
      const productsIdCount = {}
      for (const [id, count] of Object.entries(form.productsIdCount)) {
        if (id !== '?' && count > 0) productsIdCount[id] = count
      }
      const fixedForm = { ...form, productsIdCount }

      forNew
        ? postData(
            '/api/sets',
            fixedForm,
            afterConfirmUpd,
            'Набор "' + form.name + '" создан',
            () => setSubmiting(false),
            'Ошибка при создании набора "' + form.name + '"'
          )
        : putData(
            `/api/sets/${set._id}`,
            fixedForm,
            afterConfirmUpd,
            'Набор "' + form.name + '" изменен',
            () => setSubmiting(false),
            'Ошибка при редактировании набора "' + form.name + '"'
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
          ? 'Создние набора'
          : editMode
          ? 'Редактирование набора'
          : 'Набор: ' + form.name
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      errors={errors}
      buttonDisabled={!isFormChanged}
      twoCols={true}
      readOnly={readOnly}
      submiting={submiting}
    >
      <FormColumn>
        <Input
          key="name"
          label="Название"
          type="text"
          maxLength="80"
          value={form.name}
          onChange={(name) => updateForm({ name })}
          required
          // readOnly={readOnly}
          hidden={readOnly}
        />
        <Input
          key="description"
          label="Описание"
          type="text"
          maxLength="600"
          value={form.description}
          onChange={(description) => updateForm({ description })}
          textarea
          readOnly={readOnly}
        />
        <RowContainer>
          <Input
            key="article"
            label="Артикул"
            type="text"
            maxLength="100"
            value={form.article}
            onChange={(article) => updateForm({ article })}
            className="flex-1"
            readOnly={readOnly}
            inLine={readOnly}
          />
          <PriceInput
            value={form.price}
            onChange={(price) => updateForm({ price })}
            required
            className="flex-1"
            readOnly={readOnly}
            inLine={readOnly}
          />
        </RowContainer>
        <MultiselectCheckbox
          title="Типы"
          options={setTypes.map((type) => {
            return {
              name: type.name,
              value: type._id,
              checked: form.typesId.includes(type._id),
            }
          })}
          onChange={(data) => {
            updateForm({ typesId: data.map((type) => type.value) })
          }}
          readOnly={readOnly}
        />
      </FormColumn>
      <FormColumn className="flex flex-col flex-1">
        <SelectProductsList
          productsIdCount={form.productsIdCount}
          onChange={(productsIdCount) => updateForm({ productsIdCount })}
          readOnly={readOnly}
        />
        <InputImages
          images={form.images}
          label="Картинки"
          onChange={(images) => updateForm({ images })}
          readOnly={readOnly}
          directory="sets"
        />
        <CheckBox
          label="Показывать на сайте"
          checked={form.showOnSite}
          onChange={() => updateForm({ showOnSite: !form.showOnSite })}
          readOnly={readOnly}
        />
      </FormColumn>
    </Form>
  )
}

export default SetForm
