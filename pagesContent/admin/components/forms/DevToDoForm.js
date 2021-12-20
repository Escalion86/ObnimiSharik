import { useEffect, useState } from 'react'

import { DEFAULT_DEVTODO } from '@helpers/constants'

import {
  Input,
  DevToDoStatusPicker,
  PriorityPicker,
  InputImages,
} from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'
import { getSession } from 'next-auth/react'
import formValidator from '@helpers/formValidator'
import devToDoSchema from '@schemas/devToDoSchema'

const DevToDoForm = ({
  loggedUser,
  devToDo = DEFAULT_DEVTODO,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const initialFormState = {
    number: devToDo.number,
    title: devToDo.title,
    description: devToDo.description,
    images: devToDo.images,
    userId: devToDo.userId,
    status: devToDo.status,
    priority: devToDo.priority,
    finishedAt: devToDo.finishedAt,
  }

  const [form, setForm] = useState(initialFormState)

  const updateForm = (data) => setForm({ ...form, ...data })

  const forNew = devToDo._id === undefined

  const accessToContent = loggedUser.access.devToDo
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(devToDo) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  useEffect(() => {
    if (!form.userId)
      getSession().then((session) =>
        updateForm({
          userId: session.user._id,
        })
      )
  }, [])

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, devToDoSchema)
    if (Object.keys(errs).length === 0) {
      setSubmiting(true)
      const finishedAt =
        form.status === 'finished' ? new Date().toISOString() : null
      forNew
        ? postData(
            '/api/devtodo',
            { ...form, finishedAt },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Новая заявка разработчику создана',
            () => setSubmiting(false),
            'Ошибка при создании заявки разработчику'
          )
        : putData(
            `/api/devtodo/${devToDo._id}`,
            { ...form, finishedAt },
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Заявка разработчику №' + form.number + ' изменена',
            () => setSubmiting(false),
            'Ошибка при редактировании заявки разработчику №' + form.number
          )
    } else {
      setErrors(errs)
    }
  }

  const isFormChanged = !compareObjects(
    form,
    { ...initialFormState, userId: form.userId },
    true
  )

  useEffect(() => {
    setFormChanged(isFormChanged)
  }, [isFormChanged])

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        forNew
          ? 'Создние заявки разработчку'
          : editMode
          ? 'Редактирование заявки разработчку №' + form.number
          : 'Заявка разработчку №' + form.number
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      errors={errors}
      buttonDisabled={!isFormChanged}
      readOnly={readOnly}
      submiting={submiting}
    >
      <Input
        key="title"
        label="Проблема/Предложение"
        type="text"
        maxLength="100"
        value={form.title}
        onChange={(title) => updateForm({ title })}
        required
        readOnly={readOnly}
      />
      <Input
        key="description"
        label="Описание"
        type="text"
        maxLength="600"
        value={form.description}
        onChange={(description) => updateForm({ description })}
        required
        readOnly={readOnly}
        textarea
      />
      <InputImages
        images={form.images}
        label="Скриншоты"
        onChange={(images) => updateForm({ images })}
        directory="devtodo"
        readOnly={readOnly}
      />
      <PriorityPicker
        priority={form.priority}
        onChange={(priority) => updateForm({ priority })}
        inLine
        readOnly={readOnly}
      />
      {(loggedUser.role === 'dev' || readOnly) && (
        <DevToDoStatusPicker
          status={form.status}
          onChange={(status) => updateForm({ status })}
          inLine
          readOnly={readOnly}
        />
      )}
    </Form>
  )
}

export default DevToDoForm
