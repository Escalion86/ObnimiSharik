import Form from '@admincomponents/ProductForm'
import dbConnect from '@utils/dbConnect'
import Types from '@models/ProductTypes'
import Sets from '@models/Sets'

const NewProduct = ({ types = [], sets = [] }) => {
  const productForm = {
    name: '',
    description: '',
    price: 0,
    image_url: '',
    types,
    sets,
  }

  return <Form productForm={productForm} types={types} sets={sets} />
}

export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  let result = await Types.find({})
  const types = result.map((doc) => {
    const type = doc.toObject()
    type._id = type._id.toString()
    return type
  })

  result = await Sets.find({})
  const sets = result.map((doc) => {
    const set = doc.toObject()
    set._id = set._id.toString()
    return set
  })

  return { props: { types: types, sets: sets } }
}

export default NewProduct
