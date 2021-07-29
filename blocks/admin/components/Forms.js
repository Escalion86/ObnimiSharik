import { useState, useRef } from 'react'
// import { useRouter } from 'next/router'
import { mutate } from 'swr'

import Button from '@components/Button'

import ImageZoom from 'react-medium-image-zoom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

import {
  DEFAULT_PRODUCT,
  DEFAULT_SET,
  DEFAULT_PRODUCT_TYPE,
  DEFAULT_SET_TYPE,
} from '@helpers/constants'

import MultiselectCheckbox from '@admincomponents/MultiselectCheckbox'
import { resolveMotionValue } from 'framer-motion'

const Form = ({
  handleSubmit = () => {},
  title = '',
  forNew = false,
  message = '',
  errors = {},
  children,
}) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="text-lg font-semibold text-center">{title}</div>
        {children}
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

const InputComponent = (props) => {
  const newProps = { ...props }
  delete newProps['textarea']
  return props.textarea ? (
    <textarea {...newProps} rows={4} />
  ) : (
    <input {...newProps} />
  )
}

const Input = ({
  label = '',
  type,
  maxLength,
  name,
  value,
  onChange,
  required = false,
  textarea,
  accept,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <InputComponent
        className="px-2 py-1 bg-gray-200 border border-gray-700 rounded-lg"
        type={type}
        maxLength={maxLength}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        textarea={textarea}
        accept={accept}
      />
    </div>
  )
}

const PriceInput = ({ value, onChange, required = false }) => {
  if (!parseInt(value)) value = 0
  return (
    <div className="flex flex-col w-32">
      <label htmlFor="price">Стоимость</label>
      <div className="flex w-full border border-gray-700 rounded-lg flex-nowrap">
        <input
          className="flex-1 w-24 px-2 py-1 bg-gray-200 rounded-l-lg"
          type="text"
          name="price"
          value={parseInt(value)}
          onChange={onChange}
          required={required}
          onKeyPress={(e) => {
            e = e || window.event
            var charCode = typeof e.which == 'undefined' ? e.keyCode : e.which
            if (!(charCode >= 48 && charCode <= 57)) {
              e.preventDefault()
            }
          }}
        />
        <div className="flex items-center justify-center w-6 bg-gray-300 border-l border-gray-700 rounded-r-lg">
          ₽
        </div>
      </div>
    </div>
  )
}

const InputImages = ({
  image_urls = [],
  onChange = () => {},
  onAddImage = () => {},
}) => {
  const hiddenFileInput = useRef(null)
  const addImageClick = (event) => {
    hiddenFileInput.current.click()
  }

  const handleChange = (e) => {
    onAddImage(e.target.files[0])
  }

  return (
    <div className="flex flex-col">
      <label>Картинки</label>
      <div className="flex flex-wrap w-full gap-2 px-1.5 py-1 bg-gray-200 border border-gray-700 rounded-lg">
        {image_urls.map((image_url, index) => (
          <div key={index} className="relative">
            <ImageZoom
              image={{
                src: image_url,
                alt: 'special',
                className: 'w-20 h-20',
                // style: { width: '50em' }
              }}
              zoomImage={{
                src: image_url,
                alt: 'product_image',
              }}
            />
            <FontAwesomeIcon
              className="absolute top-0 right-0 text-red-700 duration-200 transform cursor-pointer hover:scale-125"
              icon={faTrash}
              size="1x"
              onClick={() => {
                // image_urls.splice(index, 1)
                onChange(image_urls.filter((image_url, i) => i !== index))
              }}
            />
          </div>
        ))}
        {image_urls.length < 4 ? (
          <div
            onClick={addImageClick}
            className="flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-500 cursor-pointer rounded-xl"
          >
            <div className="flex items-center justify-center w-20 transparent hover:scale-150 ">
              <FontAwesomeIcon
                className="text-gray-700"
                icon={faPlus}
                size="2x"
                // onClick={() => {
                //   image_urls.splice(index, 1)
                //   onChange(image_urls)
                // }}
              />
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
                accept="image/jpeg,image/png"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const contentType = 'application/json'

const compareArrays = (arrayOld, arrayNew) => {
  if (arrayOld.length === 0) return []
  return arrayOld.filter((data) => !arrayNew.includes(data))
}

const deleteImages = async (arrayOfImagesUrls) => {
  if (arrayOfImagesUrls.length > 0)
    await Promise.all(
      arrayOfImagesUrls.map(async (imageUrl) => {
        if (imageUrl.lastIndexOf('obnimisharik/') > 0)
          await deleteImage(
            imageUrl.substring(
              imageUrl.lastIndexOf('obnimisharik/'),
              imageUrl.lastIndexOf('.')
            )
          )
      })
    )
}

const deleteImage = async (imagePublicId) => {
  // const { id } = router.query

  try {
    const res = await fetch('/api/cloudimages', {
      method: 'DELETE',
      // headers: {
      //   Accept: contentType,
      //   'Content-Type': contentType,
      // },
      body: imagePublicId,
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status)
    }

    // const { data } = await res.json()
    // console.log(`data`, data)
    // mutate(url, data, false) // Update the local data without a revalidation
    // afterConfirm()
  } catch (error) {
    // setMessage('Failed to update on ' + url)
  }
}

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
    // const { data } = await res.json()
    // mutate(url, data, false)
    afterConfirm()
  } catch (error) {
    setMessage('Failed to add on ' + url)
  }
}

const sendImage = async (image, form, setForm) => {
  if (typeof image === 'object') {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'obnimisharik')

    const image_url = await fetch(
      'https://api.cloudinary.com/v1_1/escalion-ru/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          return data.secure_url
        }
      })
      .catch((err) => console.error(err))
    setForm({
      ...form,
      image_urls: [...form.image_urls, image_url],
    })
  }
}

export const ProductForm = ({
  product = DEFAULT_PRODUCT,
  productTypes = [],
  afterConfirm = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    article: product.article,
    name: product.name,
    description: product.description,
    price: product.price,
    image_urls: product.image_urls,
    types_id: product.types_id,
    archive: product.archive,
  })

  const afterConfirmUpd = (data) => {
    deleteImages(compareArrays(product.image_urls, form.image_urls))
    afterConfirm(data)
  }

  const forNew = product._id === undefined

  const handleChange = (e) => {
    const target = e.target
    const name = target.name
    // deleteImage('obnimisharik/cmurzvh8hj7e7pcwefvx')
    // if (name === 'image') {
    //   setImages([...images, target.files[0]])
    // } else {
    const value =
      name === 'price'
        ? target.value * 100
        : // : name === 'image_urls'
          // ? [target.value]
          target.value
    setForm({
      ...form,
      [name]: value,
    })
    // }
  }

  // const sendImages = async (images) => {
  //   const image_urls = await Promise.all(
  //     images.map(async (file) => {
  //       const formData = new FormData()
  //       formData.append('file', file)
  //       formData.append('upload_preset', 'obnimisharik')

  //       const res = await fetch(
  //         'https://api.cloudinary.com/v1_1/escalion-ru/image/upload',
  //         {
  //           method: 'POST',
  //           body: formData,
  //         }
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data.secure_url !== '') {
  //             return data.secure_url
  //           }
  //         })
  //         .catch((err) => console.error(err))
  //       return res
  //     })
  //   )

  //   return image_urls
  // }

  const sendForm = async () => {
    forNew
      ? postData('/api/products', form, afterConfirmUpd, setMessage)
      : putData(
          `/api/products/${product._id}`,
          form,
          afterConfirmUpd,
          setMessage
        )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      sendForm()
    } else {
      setErrors({ errs })
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    if (!form.price) err.price = 'Price is required'
    // if (!form.image_urls) err.image_url = 'Image URL is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={forNew ? 'Создние товара' : 'Редактирование товара'}
      forNew={forNew}
      message={message}
      errors={errors}
    >
      <Input
        key="name"
        label="Название"
        type="text"
        maxLength="80"
        name="name"
        value={form.name}
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
        textarea
      />
      <PriceInput value={form.price / 100} onChange={handleChange} />
      {/* <Input
        key="image_urls"
        label="Ссылка на картинку"
        type="url"
        name="image_urls"
        value={form.image_urls[0]}
        onChange={handleChange}
        required
      /> */}
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
        }}
      />
      <InputImages
        image_urls={form.image_urls}
        onChange={(image_urls) =>
          setForm({
            ...form,
            image_urls,
          })
        }
        onAddImage={(image) => sendImage(image, form, setForm)}
      />
      {/* <Input
        key="image"
        label="Картинка"
        type="file"
        name="image"
        // value={form.image}
        onChange={handleChange}
        accept="image/jpeg,image/png"
        required
      /> */}
    </Form>
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

  const afterConfirmUpd = (data) => {
    deleteImages(compareArrays(set.image_urls, form.image_urls))
    afterConfirm(data)
  }

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
        ? postData('/api/sets', form, afterConfirmUpd, setMessage)
        : putData(`/api/sets/${set._id}`, form, afterConfirmUpd, setMessage)
    } else {
      setErrors({ errs })
      console.log(`errs`, errs)
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    if (!form.price) err.price = 'Price is required'
    // if (!form.image_urls) err.image_url = 'Image URL is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={forNew ? 'Создние набора' : 'Редактирование набора'}
      forNew={forNew}
      message={message}
      errors={errors}
    >
      <Input
        key="name"
        label="Название"
        type="text"
        maxLength="80"
        name="name"
        value={form.name}
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
        textarea
      />
      <Input
        key="price"
        label="Стоимость"
        type="number"
        name="price"
        value={form.price / 100}
        onChange={handleChange}
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
      <InputImages
        image_urls={form.image_urls}
        onChange={(image_urls) =>
          setForm({
            ...form,
            image_urls,
          })
        }
        onAddImage={(image) => sendImage(image, form, setForm)}
      />
    </Form>
  )
}

export const ProductTypeForm = ({
  producttype = DEFAULT_PRODUCT_TYPE,
  afterConfirm = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: producttype.name,
  })

  const forNew = producttype._id === undefined

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
        ? postData('/api/producttypes', form, afterConfirm, setMessage)
        : putData(
            `/api/producttypes/${producttype._id}`,
            form,
            afterConfirm,
            setMessage
          )
    } else {
      setErrors({ errs })
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={forNew ? 'Создние типа товара' : 'Редактирование типа товара'}
      forNew={forNew}
      message={message}
      errors={errors}
    >
      <Input
        key="name"
        label="Название"
        type="text"
        maxLength="80"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
    </Form>
  )
}

export const SetTypeForm = ({
  settype = DEFAULT_SET_TYPE,
  afterConfirm = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: settype.name,
  })

  const forNew = settype._id === undefined

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
        ? postData('/api/settypes', form, afterConfirm, setMessage)
        : putData(
            `/api/settypes/${settype._id}`,
            form,
            afterConfirm,
            setMessage
          )
    } else {
      setErrors({ errs })
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    return err
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      title={forNew ? 'Создние типа набора' : 'Редактирование типа набора'}
      forNew={forNew}
      message={message}
      errors={errors}
    >
      <Input
        key="name"
        label="Название"
        type="text"
        maxLength="80"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
    </Form>
  )
}
