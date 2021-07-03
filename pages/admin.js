import React, { useEffect } from 'react'
// import { useRouter } from 'next/router'

import { signIn, signOut, useSession } from 'next-auth/client'

import Button from '../components/Button'

const Spinner = () => {
  return (
    <div className="relative w-16 h-16 p-4">
      <svg
        className="absolute top-0 left-0 w-16 h-16 mr-3 animate-spin text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <img src="/img/balloon.webp" alt="balloon" width={40} height={40} />
    </div>
  )
}

export default function Admin() {
  const [session, loading] = useSession()
  // const router = useRouter()

  useEffect(() => {
    if (!session && !loading) {
      signIn('google')
    }
    // if (session && session.user.role !== 'admin' && !loading) {
    //   router.push('/')
    // }
  }, [session, loading])

  return (
    <>
      {!session && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
      {session && (
        <>
          {session.user.role === 'admin' && (
            <>
              Signed in as {session.user.email} <br />
              Вы администратор
              <br />
              <Button name="Сменить учетную запись" onClick={() => signOut()} />
            </>
          )}
          {session.user.role !== 'admin' && (
            <div className="flex items-center justify-center h-screen">
              <div className="flex flex-col items-center justify-center p-10 bg-gray-400 rounded-2xl w-92">
                <div>Вы авторизировались как {session.user.email}</div>
                <div>У Вас нет доступа к панели администратора</div>
                <Button
                  name="Авторизироваться под другой учетной записью"
                  className="mt-4"
                  onClick={() => signIn('google')}
                  small
                />
              </div>
            </div>
          )}
          {/* <button onClick={() => signOut()}>Sign out</button> */}
        </>
      )}
    </>
  )
}
