import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Form = ({
  formId,
  balloonForm,
  forNewBalloon = true,
  types = [],
  sets = [],
}) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  console.log(`types`, types)
  console.log(`sets`, sets)

  const [form, setForm] = useState({
    name: balloonForm.name,
    description: balloonForm.description,
    price: balloonForm.price,
    image_url: balloonForm.image_url,
    types: balloonForm.types,
    sets: balloonForm.sets,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/balloons/${id}`, {
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

      mutate(`/api/balloons/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update baloon')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/balloons', {
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

      router.push('/')
    } catch (error) {
      setMessage('Failed to add baloon')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'poddy_trained' ? target.checked : target.value
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
      forNewBaloon ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure baloon info is filled for baloon name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    if (!form.price) err.price = 'Price is required'
    if (!form.image_url) err.image_url = 'Image URL is required'
    return err
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength="20"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          maxLength="20"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        {/* 
        <label htmlFor="owner_name">Owner</label>
        <input
          type="text"
          maxLength="20"
          name="owner_name"
          value={form.owner_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="species">Species</label>
        <input
          type="text"
          maxLength="30"
          name="species"
          value={form.species}
          onChange={handleChange}
          required
        /> */}

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        {/* 
        <label htmlFor="poddy_trained">Potty Trained</label>
        <input
          type="checkbox"
          name="poddy_trained"
          checked={form.poddy_trained}
          onChange={handleChange}
        />

        <label htmlFor="diet">Diet</label>
        <textarea
          name="diet"
          maxLength="60"
          value={form.diet}
          onChange={handleChange}
        /> */}

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        />

        {/* <label htmlFor="likes">Likes</label>
        <textarea
          name="likes"
          maxLength="60"
          value={form.likes}
          onChange={handleChange}
        />

        <label htmlFor="dislikes">Dislikes</label>
        <textarea
          name="dislikes"
          maxLength="60"
          value={form.dislikes}
          onChange={handleChange}
        /> */}

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form
