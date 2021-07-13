import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '@utils/dbConnect'
import Balloons from '@models/Balloons'

/* Allows you to view baloon card info and delete baloon card*/
const BaloonPage = ({ baloon }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const baloonID = router.query.id

    try {
      await fetch(`/api/balloons/${baloonID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the baloon.')
    }
  }

  return (
    <div key={baloon._id}>
      <div className="card">
        <img src={baloon.image_url} />
        <h5 className="baloon-name">{baloon.name}</h5>
        <div className="main-content">
          <p className="baloon-name">{baloon.name}</p>
          <p className="price">Price: {baloon.price}</p>
          {/* <p className="owner">Owner: {baloon.owner_name}</p> */}

          {/* Extra Baloon Info: Likes and Dislikes */}
          {/* <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {baloon.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {baloon.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div> */}

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${baloon._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const baloon = await Balloons.findById(params.id).lean()
  baloon._id = baloon._id.toString()

  return { props: { baloon } }
}

export default BaloonPage
