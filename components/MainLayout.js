import Head from 'next/head'
import Link from 'next/link'
import DeviceCheck from './DeviceCheck'
import HeadPanel from './HeadPanel'
// import { Fab, Action } from 'react-tiny-fab'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import Fab from '@components/Fab'

function MainLayout({ title = '', children = null }) {
  return (
    <>
      <Head>
        <title className="">{title}</title>
      </Head>

      <main className="relative flex flex-col items-start justify-center w-full min-h-screen text-white text-futura">
        <HeadPanel />
        <DeviceCheck />
        {children}
      </main>
      <Fab />
    </>
  )
}

export default MainLayout
