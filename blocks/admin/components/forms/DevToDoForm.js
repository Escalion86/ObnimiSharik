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

const DevToDoForm = ({
  loggedUser,
  devToDo = DEFAULT_DEVTODO,
  afterConfirm = () => {},
  onClose = () => {},
  readOnly = true,
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    number: devToDo.number,
    title: devToDo.title,
    description: devToDo.description,
    images: devToDo.images,
    userId: devToDo.userId,
    status: devToDo.status,
    priority: devToDo.priority,
    finishedAt: devToDo.finishedAt,
  })

  const forNew = devToDo._id === undefined

  const handleChange = (e) => {
    const target = e.target
    const value = target.name === 'images' ? [target.value] : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  useEffect(() => {
    if (!form.userId)
      getSession().then((session) =>
        setForm({
          ...form,
          userId: session.user._id,
        })
      )
  }, [])

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
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
            'Ошибка при редактировании заявки разработчику №' + form.number
          )
    } else {
      setErrors(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.title) err.title = 'title is required'
    if (!form.description) err.description = 'description is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        readOnly
          ? 'Заявка разработчку №' + form.number
          : forNew
          ? 'Создние заявки разработчку'
          : 'Редактирование заявки разработчку №' + form.number
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={
        Object.keys(formValidate()).length !== 0 ||
        compareObjects(form, devToDo)
      }
    >
      <Input
        key="title"
        label="Проблема/Предложение"
        type="text"
        maxLength="100"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        readOnly={readOnly}
      />
      <Input
        key="description"
        label="Описание"
        type="text"
        maxLength="600"
        name="description"
        value={form.description}
        onChange={handleChange}
        required
        readOnly={readOnly}
        textarea
      />
      <InputImages
        images={form.images}
        label="Скриншоты"
        onChange={(images) =>
          setForm({
            ...form,
            images,
          })
        }
        directory="devtodo"
      />
      <PriorityPicker
        priority={form.priority}
        onChange={(priority) =>
          setForm({
            ...form,
            priority,
          })
        }
        inLine
        readOnly={readOnly}
      />
      {(loggedUser.role === 'dev' || readOnly) && (
        <DevToDoStatusPicker
          status={form.status}
          onChange={(status) =>
            setForm({
              ...form,
              status,
            })
          }
          inLine
          readOnly={readOnly}
        />
      )}
    </Form>
  )
}

export default DevToDoForm
