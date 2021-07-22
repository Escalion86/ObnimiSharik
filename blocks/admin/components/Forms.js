import { useState } from 'react'
// import { useRouter } from 'next/router'
import { mutate } from 'swr'

import Button from '@components/Button'

import { DEFAULT_PRODUCT, DEFAULT_SET } from '@helpers/constants'

import MultiselectCheckbox from '@admincomponents/MultiselectCheckbox'

const Input = ({
  label = '',
  type,
  maxLength,
  name,
  value,
  onChange,
  required,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name}>{label}</label>
    <input
      className="px-2 py-1 bg-gray-200 border border-gray-700 rounded-lg"
      type={type}
      maxLength={maxLength}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
)

const contentType = 'application/json'

const putData = async (url, form, afterConfirm, setMessage) => {
  // const { id } = router.query

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(form),
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status)
    }

    const { data } = await res.json()

    mutate(url, data, false) // Update the local data without a revalidation
    // router.push('/admin')
    // router.reload()
    afterConfirm()
  } catch (error) {
    setMessage('Failed to update on ' + url)
  }
}

/* The POST method adds a new entry in the mongodb database. */
const postData = async (url, form, afterConfirm, setMessage) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(form),
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status)
    }

    // router.push('/admin')
    // router.reload()
    afterConfirm()
  } catch (error) {
    setMessage('Failed to add on ' + url)
  }
}

export const ProductForm = ({
  product = DEFAULT_PRODUCT,
  productTypes = [],
  afterConfirm = () => {},
}) => {
  // const router = useRouter()
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  // console.log(`types`, types)

  const [form, setForm] = useState({
    article: product.article,
    name: product.name,
    description: product.description,
    price: product.price,
    image_urls: product.image_urls,
    types_id: product.types_id,
    archive: product.archive,
  })

  const forNew = product._id === undefined

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'price'
        ? target.value * 100
        : target.name === 'image_urls'
        ? [target.value]
        : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData('/api/products', form, afterConfirm, setMessage)
        : putData(
            `/api/products/${product._id}`,
            form,
            afterConfirm,
            setMessage
          )
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure baloon info is filled for baloon name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    if (!form.price) err.price = 'Price is required'
    // if (!form.image_urls) err.image_url = 'Image URL is required'
    return err
  }

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="text-lg font-semibold text-center">
          {forNew ? 'Создние товара' : 'Редактирование товара'}
        </div>
        <Input
          key="name"
          label="Название"
          type="text"
          maxLength="20"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          key="description"
          label="Описание"
          type="text"
          maxLength="20"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <Input
          key="price"
          label="Стоимость"
          type="number"
          name="price"
          value={form.price / 100}
          onChange={handleChange}
        />
        <Input
          key="image_urls"
          label="Ссылка на картинку"
          type="url"
          name="image_urls"
          value={form.image_urls[0]}
          onChange={handleChange}
          required
        />
        <MultiselectCheckbox
          title="Типы"
          options={productTypes.map((type) => {
            return {
              label: type.name,
              id: type._id,
              checked: form.types_id.includes(type._id),
            }
          })}
          onChange={(data) => {
            setForm({
              ...form,
              types_id: data.map((type) => type.id),
            })
            // console.log('checked', data)
          }}
        />
        <Button
          onClick={handleSubmit}
          name={forNew ? 'Создать' : 'Применить'}
          small
          inverse
        />
      </div>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export const SetForm = ({
  set = DEFAULT_SET,
  setTypes = [],
  afterConfirm = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    article: set.article,
    name: set.name,
    description: set.description,
    price: set.price,
    image_urls: set.image_urls,
    types_id: set.types_id,
    products_id: set.products_id,
    archive: set.archive,
  })

  const forNew = set._id === undefined

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'price'
        ? target.value * 100
        : target.name === 'image_urls'
        ? [target.value]
        : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData('/api/sets', form, afterConfirm, setMessage)
        : putData(`/api/sets/${set._id}`, form, afterConfirm, setMessage)
    } else {
      setErrors({ errs })
      console.log(`errs`, errs)
    }
  }

  /* Makes sure baloon info is filled for baloon name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    if (!form.price) err.price = 'Price is required'
    // if (!form.image_urls) err.image_url = 'Image URL is required'
    return err
  }

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="text-lg font-semibold text-center">
          {forNew ? 'Создние набора' : 'Редактирование набора'}
        </div>
        <Input
          key="name"
          label="Название"
          type="text"
          maxLength="20"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          key="description"
          label="Описание"
          type="text"
          maxLength="20"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <Input
          key="price"
          label="Стоимость"
          type="number"
          name="price"
          value={form.price / 100}
          onChange={handleChange}
        />
        <Input
          key="image_urls"
          label="Ссылка на картинку"
          type="url"
          name="image_urls"
          value={form.image_urls[0]}
          onChange={handleChange}
          required
        />
        <MultiselectCheckbox
          title="Типы"
          options={setTypes.map((type) => {
            return {
              label: type.name,
              id: type._id,
              checked: form.types_id.includes(type._id),
            }
          })}
          onChange={(data) => {
            setForm({
              ...form,
              types_id: data.map((type) => type.id),
            })
            // console.log('checked', data)
          }}
        />
        <Button
          onClick={handleSubmit}
          name={forNew ? 'Создать' : 'Применить'}
          small
          inverse
        />
      </div>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}
