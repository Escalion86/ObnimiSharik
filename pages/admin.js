import React, { useEffect, useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/client'

import { faPlus, faBug } from '@fortawesome/free-solid-svg-icons'

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
  TestContent,
  ProductCirculationsContent,
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
  ConfirmModal,
  ProductCirculationModal,
} from '@adminblocks/modals'

import {
  fetchingAll,
  fetchingProducts,
  fetchingProductTypes,
  fetchingSets,
  fetchingSetTypes,
  fetchingInvitations,
  fetchingUsers,
  fetchingProductCirculations,
} from '@helpers/fetchers'

import { ROLES } from '@helpers/constants'

const menuCfg = (pages, pagesGroups, userRole) => {
  let result = []
  pagesGroups.forEach((group) => {
    let items = []
    pages.forEach((page) => {
      if (
        page.group === group.id &&
        (userRole === 'dev' || page.accessRoles.includes(userRole))
      )
        items.push(page)
    })
    if (items.length > 0) result.push({ name: group.name, items })
  })
  return result
}

export default function Admin() {
  const [session, loading] = useSession()
  const [data, setData] = useState({
    products: [],
    productTypes: [],
    sets: [],
    setTypes: [],
    users: [],
    invitations: [],
    productCirculations: [],
  })
  const [modal, setModal] = useState(null)
  const [confirmModal, setConfirmModal] = useState([])

  const updateData = (newData) => {
    setData({ ...data, ...newData })
  }

  const openConfirmModal = (title, message, onConfirm) => {
    setConfirmModal(() => (
      <ConfirmModal
        title={title}
        message={message}
        onConfirm={onConfirm}
        onClose={() => setConfirmModal(null)}
      />
    ))
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
          confirmModal={openConfirmModal}
        />
      )),
    openProductModal: (product) =>
      setModal(() => (
        <ProductModal
          product={product}
          productTypes={data.productTypes}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingProducts(updateData)}
          confirmModal={openConfirmModal}
        />
      )),
    openProductTypeModal: (producttype) =>
      setModal(() => (
        <ProductTypeModal
          producttype={producttype}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingProductTypes(updateData)}
          confirmModal={openConfirmModal}
        />
      )),
    openSetTypeModal: (settype) =>
      setModal(() => (
        <SetTypeModal
          settype={settype}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingSetTypes(updateData)}
          confirmModal={openConfirmModal}
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
          confirmModal={openConfirmModal}
        />
      )),
    openInvitationModal: (invitation) =>
      setModal(() => (
        <InvitationModal
          invitation={invitation}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingInvitations(updateData)}
          confirmModal={openConfirmModal}
        />
      )),
    openProductCirculationModal: (productCirculation) =>
      setModal(() => (
        <ProductCirculationModal
          productCirculation={productCirculation}
          products={data.products}
          onClose={() => setModal(null)}
          afterConfirm={() => fetchingProductCirculations(updateData)}
          confirmModal={openConfirmModal}
        />
      )),
    openMessageModal: (message) =>
      setModal(() => (
        <MessageModal message={message} onClose={() => setModal(null)} />
      )),
    openConfirmModal,
  }

  const TitleBtn = ({ onClick = null, icon = faPlus }) => {
    if (!onClick) return null
    return <IconButton onClick={onClick} inverse icon={icon} />
  }

  const BtnAddProduct = ({ key }) => (
    <TitleBtn
      onClick={() => modals.openProductModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnAddSet = ({ key }) => (
    <TitleBtn onClick={() => modals.openSetModal()} icon={faPlus} key={key} />
  )

  const BtnAddProductType = ({ key }) => (
    <TitleBtn
      onClick={() => modals.openProductTypeModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnAddSetType = ({ key }) => (
    <TitleBtn
      onClick={() => modals.openSetTypeModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnAddInvitation = ({ key }) => (
    <TitleBtn
      onClick={() => modals.openInvitationModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnAddProductCirculation = ({ key }) => (
    <TitleBtn
      onClick={() => modals.openProductCirculationModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnTest = ({ key }) => (
    <TitleBtn
      onClick={() =>
        modals.openConfirmModal('Заголовок', 'Текст сообщения', () =>
          console.log('Принято')
        )
      }
      icon={faBug}
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
      name: 'Типы товаров',
      header: 'Типы товаров',
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
    {
      id: 9,
      group: 5,
      name: 'Тестовая страница',
      header: 'Тестовая страница',
      pageContent: TestContent,
      pageButtons: [BtnTest],
      backToPageId: 0,
      accessRoles: [],
    },
    {
      id: 10,
      group: 2,
      name: 'Движение товаров',
      header: 'Движение товаров',
      pageContent: ProductCirculationsContent,
      pageButtons: [BtnAddProductCirculation],
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
    { id: 5, name: 'Разработка' },
  ]

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

  const haveAccess =
    session?.user?.role &&
    ROLES.filter((role) => role.value === session.user.role).length > 0

  return (
    <>
      {(!session || loading) && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
      {session && !loading && (
        <>
          {haveAccess ? (
            <>
              {modal}
              {confirmModal}
              <Cabinet
                page={page}
                setPageId={setPageId}
                menuCfg={menuCfg(pages, pagesGroups, session.user.role)}
                user={session.user}
                onSignOut={signOut}
              >
                <main className="flex flex-col flex-1 overflow-y-auto">
                  <Title
                    text={page.header}
                    buttons={
                      page.pageButtons
                        ? page.pageButtons.map((button, index) =>
                            button({ key: 'titleButton' + index })
                          )
                        : null
                    }
                  />
                  <div className="flex flex-col flex-1 max-h-full px-3 pb-3 overflow-y-scroll">
                    <div className="relative flex flex-col flex-1">
                      <div className="flex-1 h-full">
                        <PageContent
                          data={data}
                          setModal={setModal}
                          updateData={updateData}
                          modals={modals}
                          user={session.user}
                        />
                      </div>
                    </div>
                  </div>
                </main>
              </Cabinet>
            </>
          ) : (
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
