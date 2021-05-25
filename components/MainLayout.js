import Head from 'next/head'
import Link from 'next/link'
import HeadPanel from './HeadPanel'

function MainLayout({ title = '', children = null }) {
  return (
    <>
      <Head>
        <title className="">{title}</title>
      </Head>

      <main className="relative flex flex-col items-center justify-start w-full min-h-screen text-white text-futura">
        <HeadPanel />
        {children}
      </main>
    </>
  )
}

export default MainLayout
