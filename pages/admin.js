import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

import { signIn, signOut, useSession } from 'next-auth/client'

import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'

import Button from '@components/Button'
import IconButton from '@components/IconButton'

import Title from '@adminblocks/Title'
import Cabinet from '@adminblocks/Cabinet'

import Spinner from '@admincomponents/Spinner'

import {
  ProductsContent,
  ProductTypesContent,
  SetTypesContent,
  SetsContent,
  UsersContent,
  InvitationsContent,
  SettingsContent,
} from '@adminblocks/content'

import {
  ProductModal,
  SetModal,
  ProductTypeModal,
  SetTypeModal,
  InvitationModal,
  TildaImportModal,
  UserModal,
  MessageModal,
} from '@adminblocks/modals'

import {
  fetchingAll,
  fetchingProducts,
  fetchingProductTypes,
  fetchingSets,
  fetchingSetTypes,
  fetchingInvitations,
  fetchingUsers,
} from '@helpers/fetchers'

const TitleBtn = ({ data, setModal, modal, icon = faPlus, afterConfirm }) => {
  const Modal = modal
  return (
    <IconButton
      onClick={() =>
        setModal(() => (
          <Modal
            {...data}
            onClose={() => setModal(null)}
            afterConfirm={afterConfirm}
          />
        ))
      }
      inverse
      icon={icon}
    />
  )
}

const BtnAddSet = ({ data, setModal, updateData, key }) => (
  <TitleBtn
    data={data}
    setModal={setModal}
    modal={SetModal}
    icon={faPlus}
    afterConfirm={() => fetchingSets(updateData)}
    key={key}
  />
)

const BtnAddProductType = ({ data, setModal, updateData, key }) => (
  <TitleBtn
    data={data}
    setModal={setModal}
    modal={ProductTypeModal}
    icon={faPlus}
    afterConfirm={() => fetchingProductTypes(updateData)}
    key={key}
  />
)

const BtnAddSetType = ({ data, setModal, updateData, key }) => (
  <TitleBtn
    data={data}
    setModal={setModal}
    modal={SetTypeModal}
    icon={faPlus}
    afterConfirm={() => fetchingSetTypes(updateData)}
    key={key}
  />
)

const BtnAddProduct = ({ data, setModal, updateData, key }) => (
  <TitleBtn
    data={data}
    setModal={setModal}
    modal={ProductModal}
    icon={faPlus}
    afterConfirm={() => fetchingProducts(updateData)}
    key={key}
  />
)

const BtnAddInvitation = ({ data, setModal, updateData, key }) => (
  <TitleBtn
    data={data}
    setModal={setModal}
    modal={InvitationModal}
    icon={faPlus}
    afterConfirm={() => fetchingInvitations(updateData)}
    key={key}
  />
)

const pages = [
  {
    id: 0,
    group: 0,
    name: 'Обзор',
    header: 'Обзор',
    pageContent: null,
    pageButtons: [],
    backToPageId: null,
    accessRoles: ['admin'],
  }, // 3
  {
    id: 1,
    group: 1,
    name: 'Товары',
    header: 'Товары',
    pageContent: ProductsContent,
    pageButtons: [BtnAddProduct],
    backToPageId: null,
    accessRoles: ['admin', 'operator', 'aerodesigner'],
  }, // 0
  {
    id: 2,
    group: 1,
    name: 'Типы шариков',
    header: 'Типы шариков',
    pageContent: ProductTypesContent,
    pageButtons: [BtnAddProductType],
    backToPageId: null,
    accessRoles: ['admin'],
  }, // 1
  {
    id: 3,
    group: 1,
    name: 'Наборы',
    header: 'Наборы',
    pageContent: SetsContent,
    pageButtons: [BtnAddSet],
    backToPageId: null,
    accessRoles: ['admin', 'operator', 'aerodesigner'],
  }, // 2
  {
    id: 4,
    group: 1,
    name: 'Типы наборов',
    header: 'Типы наборов',
    pageContent: SetTypesContent,
    pageButtons: [BtnAddSetType],
    backToPageId: null,
    accessRoles: ['admin'],
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
    pageContent: UsersContent,
    pageButtons: [],
    backToPageId: null,
    accessRoles: ['admin'],
  }, // 3
  {
    id: 7,
    group: 3,
    name: 'Приглашения',
    header: 'Приглашения',
    pageContent: InvitationsContent,
    pageButtons: [BtnAddInvitation],
    backToPageId: null,
    accessRoles: ['admin'],
  },
  {
    id: 8,
    group: 4,
    name: 'Настройки',
    header: 'Настройки',
    pageContent: SettingsContent,
    pageButtons: [],
    backToPageId: 0,
    accessRoles: ['admin'],
  },
]

const pagesGroups = [
  { id: 0, name: '' },
  { id: 1, name: 'Продукция' },
  { id: 2, name: 'Склад' },
  { id: 3, name: 'Пользователи' },
  { id: 4, name: 'Настройки' },
]

const menuCfg = (pages, pagesGroups, userRole) => {
  let result = []
  pagesGroups.forEach((group) => {
    let items = []
    pages.forEach((page) => {
      if (page.group === group.id && page.accessRoles.includes(userRole))
        items.push(page)
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
    users: [],
    invitations: [],
  })
  const [Modal, setModal] = useState(null)

  // console.log(`data`, data)
  const updateData = (newData) => {
    setData({ ...data, ...newData })
  }

  const modals = {
    openSetModal: (set) =>
      setModal(() => (
        <SetModal
          set={set}
          setTypes={data.setTypes}
          products={data.products}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingSets(updateData)}
        />
      )),
    openProductModal: (product) =>
      setModal(() => (
        <ProductModal
          product={product}
          productTypes={data.productTypes}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingProducts(updateData)}
        />
      )),
    openProductTypeModal: (producttype) =>
      setModal(() => (
        <ProductTypeModal
          producttype={producttype}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingProductTypes(updateData)}
        />
      )),
    openSetTypeModal: (settype) =>
      setModal(() => (
        <SetTypeModal
          settype={settype}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingSetTypes(updateData)}
        />
      )),
    openTildaImportModal: () =>
      setModal(() => (
        <TildaImportModal {...data} onClose={() => setModal(null)} />
      )),
    openUserModal: (user) =>
      setModal(() => (
        <UserModal
          user={user}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingUsers(updateData)}
        />
      )),
    openInvitationModal: (invitation) =>
      setModal(() => (
        <InvitationModal
          invitation={invitation}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingInvitations(updateData)}
        />
      )),
    openMessageModal: (message) =>
      setModal(() => (
        <MessageModal message={message} onClose={() => setModal(null)} />
      )),
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
          {(session.user.role === 'admin' ||
            session.user.role === 'aerodesigner' ||
            session.user.role === 'deliver' ||
            session.user.role === 'operator') && (
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
                menuCfg={menuCfg(pages, pagesGroups, session.user.role)}
                user={session.user}
                // setUser={setUserState}
                onSignOut={signOut}
              >
                <div className="relative flex flex-col flex-1">
                  <Title
                    text={page.header}
                    buttons={
                      page.pageButtons
                        ? page.pageButtons.map((button, index) =>
                            button({
                              data,
                              setModal,
                              key: 'titleButton' + index,
                              updateData: updateData,
                            })
                          )
                        : null
                    }
                  />
                  <div className="flex-1 h-full">
                    <PageContent
                      data={data}
                      setModal={setModal}
                      updateData={updateData}
                      modals={modals}
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
