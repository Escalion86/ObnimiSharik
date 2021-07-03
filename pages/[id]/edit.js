import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditBaloon = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: baloon, error } = useSWR(
    id ? `/api/balloons/${id}` : null,
    fetcher
  )

  if (error) return <p>Failed to load</p>
  if (!baloon) return <p>Loading...</p>

  const baloonForm = {
    name: baloon.name,
    description: baloon.description,
    price: baloon.price,
    image_url: baloon.image_url,
    types: baloon.types,
    sets: baloon.sets,
  }

  return (
    <Form
      formId="edit-baloon-form"
      baloonForm={baloonForm}
      forNewBaloon={false}
    />
  )
}

export default EditBaloon
