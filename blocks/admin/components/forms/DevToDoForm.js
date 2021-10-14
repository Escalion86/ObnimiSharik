import { useEffect, useState } from 'react'

import { DEFAULT_DEVTODO } from '@helpers/constants'

import { ComboBox, Input, SelectOrder, SelectClient } from './forForms'

import { postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'
import PriorityPicker from './forForms/PropValuePicker/PriorityPicker'
import { getSession } from 'next-auth/client'
import DevToDoStatusPicker from './forForms/PropValuePicker/DevToDoStatusPicker'

const DevToDoForm = ({
  role,
  devToDo = DEFAULT_DEVTODO,
  afterConfirm = () => {},
  onClose = () => {},
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
      forNew
        ? postData(
            '/api/devtodo',
            form,
            (data) => {
              afterConfirm(data)
              onClose()
            },
            'Новая заявка разработчику создана',
            'Ошибка при создании заявки разработчику'
          )
        : putData(
            `/api/devtodo/${devToDo._id}`,
            form,
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
        forNew
          ? 'Создние заявки разработчку'
          : 'Редактирование заявки разработчку'
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
        label="Заголовок"
        type="text"
        maxLength="100"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
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
      />
      <DevToDoStatusPicker
        status={form.status}
        onChange={(status) =>
          setForm({
            ...form,
            status,
          })
        }
        inLine
      />
      {/* <ComboBox
        name="role"
        title="Статус"
        handleChange={handleChange}
        defaultValue={form.role}
        placeholder="Выберите должность"
        items={ROLES.filter((role) => !role.hidden)}
        required
      /> */}
      {/* <div className="flex flex-col">
        <label htmlFor="role">Должность</label>
        <select
          name="role"
          className="px-2 py-1 bg-gray-200 border border-gray-700 rounded-lg"
          onChange={handleChange}
          defaultValue={form.role}
        >
          <option>Выберите должность</option>
          <option value="admin">Администратор</option>
          <option value="aerodesigner">Аэродизайнер</option>
          <option value="deliver">Курьер</option>
        </select>
      </div> */}
    </Form>
  )
}

export default DevToDoForm
