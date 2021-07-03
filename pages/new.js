import Form from '../components/Form'
import dbConnect from '../utils/dbConnect'
import Types from '../models/Types'
import Sets from '../models/Sets'

const NewBalloon = ({ types, sets }) => {
  const balloonForm = {
    name: '',
    description: '',
    price: 0,
    image_url: '',
    types: [],
    sets: [],
  }

  return (
    <Form
      formId="add-balloon-form"
      balloonForm={balloonForm}
      types={types}
      sets={sets}
    />
  )
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

export default NewBalloon
