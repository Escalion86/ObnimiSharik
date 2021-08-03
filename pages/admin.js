import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

import { signIn, signOut, useSession } from 'next-auth/client'

import Button from '@components/Button'
import Cabinet from '@adminblocks/Cabinet'

import Spinner from '@admincomponents/Spinner'
// import PageContent from '@adminblocks/PageContent'
import Title from '@adminblocks/Title'
import ProductsContent from '@adminblocks/content/ProductsContent'
import ProductTypesContent from '@adminblocks/content/ProductTypesContent'
import SetTypesContent from '@adminblocks/content/SetTypesContent'
import SetsContent from '@adminblocks/content/SetsContent'

import IconButton from '@components/IconButton'

import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'

import ProductModal from '@adminblocks/modals/ProductModal'
import SetModal from '@adminblocks/modals/SetModal'
import ProductTypeModal from '@adminblocks/modals/ProductTypeModal'
import SetTypeModal from '@adminblocks/modals/SetTypeModal'

import { fetchingAll } from '@helpers/fetchers'

import TildaImportModal from '@adminblocks/modals/TildaImportModal'
import UsersInvitationsContent from '@adminblocks/content/UsersInvitationsContent'
import InvitationModal from '@adminblocks/modals/InvitationModal'

// import dbConnect from '@utils/dbConnect'
// import Balloons from '@models/Balloons'
// import Types from '@models/Types'
// import Sets from '@models/Sets'

// import useSWR from 'swr'

const BtnAddSet = ({ data, setModal, key }) => (
  <IconButton
    key={key}
    onClick={() =>
      setModal(() => (
        <SetModal setTypes={data.setTypes} onClose={() => setModal(null)} />
      ))
    }
    inverse
    icon={faPlus}
  />
)

const BtnAddProductType = ({ data, setModal, key }) => (
  <IconButton
    key={key}
    onClick={() =>
      setModal(() => <ProductTypeModal onClose={() => setModal(null)} />)
    }
    inverse
    icon={faPlus}
  />
)

const BtnAddSetType = ({ data, setModal, key }) => (
  <IconButton
    key={key}
    onClick={() =>
      setModal(() => <SetTypeModal onClose={() => setModal(null)} />)
    }
    inverse
    icon={faPlus}
  />
)

const BtnAddProduct = ({ data, setModal, key }) => (
  <IconButton
    key={key}
    onClick={() =>
      setModal(() => (
        <ProductModal
          productTypes={data.productTypes}
          onClose={() => setModal(null)}
        />
      ))
    }
    inverse
    icon={faPlus}
  />
)

const BtnImport = ({ setModal, key }) => (
  <IconButton
    key={key}
    onClick={() =>
      setModal(() => <TildaImportModal onClose={() => setModal(null)} />)
    }
    inverse
    icon={faDownload}
  />
)

const BtnAddInvitation = ({ data, setModal, key }) => (
  <IconButton
    key={key}
    onClick={() =>
      setModal(() => <InvitationModal onClose={() => setModal(null)} />)
    }
    inverse
    icon={faPlus}
  />
)

const pages = [
  {
    id: 0,
    group: null,
    name: 'Обзор',
    header: 'Обзор',
    pageContent: null,
    pageButtons: [],
    backToPageId: null,
  }, // 3
  {
    id: 1,
    group: 1,
    name: 'Товары',
    header: 'Товары',
    pageContent: ProductsContent,
    pageButtons: [BtnImport, BtnAddProduct],
    backToPageId: null,
  }, // 0
  {
    id: 2,
    group: 1,
    name: 'Типы шариков',
    header: 'Типы шариков',
    pageContent: ProductTypesContent,
    pageButtons: [BtnAddProductType],
    backToPageId: null,
  }, // 1
  {
    id: 3,
    group: 1,
    name: 'Наборы',
    header: 'Наборы',
    pageContent: SetsContent,
    pageButtons: [BtnAddSet],
    backToPageId: null,
  }, // 2
  {
    id: 4,
    group: 1,
    name: 'Типы наборов',
    header: 'Типы наборов',
    pageContent: SetTypesContent,
    pageButtons: [BtnAddSetType],
    backToPageId: null,
  }, // 1
  {
    id: 5,
    group: null,
    name: 'Параметры учетной записи',
    header: 'Параметры учетной записи',
    pageContent: null,
    pageButtons: [],
    backToPageId: null,
  }, // 3
  {
    id: 6,
    group: 3,
    name: 'Сотрудники',
    header: 'Сотрудники',
    pageContent: null,
    pageButtons: [],
    backToPageId: null,
  }, // 3
  {
    id: 7,
    group: 3,
    name: 'Приглашения',
    header: 'Приглашения',
    pageContent: UsersInvitationsContent,
    pageButtons: [BtnAddInvitation],
    backToPageId: null,
  }, // 3
  // {
  //   id: 4,
  //   group: null,
  //   name: 'Урок',
  //   header: 'Урок',
  //   pageContent: Lesson,
  //   backToPageId: 0,
  // },
]

const pagesGroups = [
  { id: 0, name: '' },
  { id: 1, name: 'Продукция' },
  { id: 2, name: 'Склад' },
  { id: 3, name: 'Пользователи' },
]

const menuCfg = (pages, pagesGroups) => {
  let result = []
  pagesGroups.forEach((group) => {
    let items = []
    pages.forEach((page) => {
      if (page.group === group.id) items.push(page)
    })
    if (items.length > 0) result.push({ name: group.name, items })
  })
  return result
}

// const fetcher = (url) =>
//   fetch(url)
//     .then((res) => res.json())
//     .then((json) => json.data)

export default function Admin() {
  const [session, loading] = useSession()
  const [data, setData] = useState({
    products: [],
    productTypes: [],
    sets: [],
    setTypes: [],
  })
  const [Modal, setModal] = useState(null)

  // console.log(`data`, data)
  const updateData = (newData) => {
    setData({ ...data, ...newData })
  }

  // const router = useRouter()
  const [page, setPage] = useState(pages[0])

  useEffect(() => {
    if (!session && !loading) {
      signIn('google')
    } else {
      fetchingAll(setData)
    }
  }, [session, loading])

  const setPageId = (id, props = {}) => {
    pages.some((page) => {
      if (page.id === id) {
        setPage({ ...page, ...props })
        return true
      }
    })
  }

  const PageContent = (data) =>
    page?.pageContent ? (
      page.pageContent(data)
    ) : (
      <div className="flex items-center justify-center h-full text-xl">
        Страница в разработке
      </div>
    )

  return (
    <>
      {(!session || loading) && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
      {session && !loading && (
        <>
          {session.user.role === 'admin' && (
            // <>
            //   Signed in as {session.user.email} <br />
            //   Вы администратор
            //   <br />
            //   <Button name="Сменить учетную запись" onClick={() => signOut()} />
            // </>
            <>
              {/* <Modal
                product={data.products[0]}
                types={data.types}
                sets={data.sets}
                title="Создание продукта"
              /> */}
              {Modal ? Modal : null}
              {/* <ProductModal types={data.types} title="Создание продукта" /> */}
              <Cabinet
                page={page}
                setPageId={setPageId}
                // courses={courses}
                menuCfg={menuCfg(pages, pagesGroups)}
                user={session.user}
                // setUser={setUserState}
                onSignOut={signOut}
              >
                <div className="relative flex flex-col flex-1">
                  <Title
                    text={page.header}
                    buttons={page.pageButtons.map((button, index) =>
                      button({ data, setModal, key: 'titleButton' + index })
                    )}
                  />
                  <div className="flex-1 h-full">
                    <PageContent
                      data={data}
                      setModal={setModal}
                      updateData={updateData}
                    />
                  </div>
                </div>
                {/* <PageContent data={data} page={page} /> */}
              </Cabinet>
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

/* Retrieves pet(s) data from mongodb database */
// export async function getServerSideProps() {
// await dbConnect()

// let result = await Types.find({})
// const types = result.map((doc) => {
//   const type = doc.toObject()
//   type._id = type._id.toString()
//   return type
// })

// result = await Sets.find({})
// const sets = result.map((doc) => {
//   const set = doc.toObject()
//   set._id = set._id.toString()
//   return set
// })

// /* find all the data in our database */
// result = await Balloons.find({})
// const balloons = result.map((doc) => {
//   const baloon = doc.toObject()
//   baloon._id = baloon._id.toString()
//   return baloon
// })

// return { props: { balloons: balloons, types: types, sets: sets } }
// return { props: { db_uri: process.env.MONGODB_URI } }
// }
