import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { signIn, signOut, useSession } from 'next-auth/client'

import { faPlus, faBug } from '@fortawesome/free-solid-svg-icons'

import Button from '@components/Button'

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
  UserContent,
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
import {
  setAllData,
  setSets,
  setProducts,
  setSetTypes,
  setProductTypes,
  setUsers,
  setInvitations,
  setProductCirculations,
} from '@state/actions'
// import { addModal, removeModal } from '@state/actions/modalsActions'
import {
  addModal,
  removeAllModals,
  removeModal,
} from '@state/actions/modalsActions'
import modalsFunctions from '@adminblocks/modals/modalsFunctions'
import TitleButton from '@admincomponents/TitleButton'
// import { setSets } from '@state/actions/setsActions'
// import { setProducts } from '@state/actions/productsActions'
// import { setSetTypes } from '@state/actions/setTypesActions'
// import { setProductTypes } from '@state/actions/productTypesActions'
// import { setUsers } from '@state/actions/usersActions'
// import { setInvitations } from '@state/actions/invitationsActions'
// import { setProductCirculations } from '@state/actions/productCirculationsActions'

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

  const data = useSelector((state) => state)

  const dispatch = useDispatch()

  const modals = modalsFunctions(dispatch, data)

  const BtnAddProduct = ({ key }) => (
    <TitleButton
      onClick={() => modals.openProductModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnAddSet = ({ key }) => (
    <TitleButton
      onClick={() => modals.openSetModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnAddProductType = ({ key }) => (
    <TitleButton
      onClick={() => modals.openProductTypeModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnAddSetType = ({ key }) => (
    <TitleButton
      onClick={() => modals.openSetTypeModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnAddInvitation = ({ key }) => (
    <TitleButton
      onClick={() => modals.openInvitationModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnAddProductCirculation = ({ key }) => (
    <TitleButton
      onClick={() => modals.openProductCirculationModal()}
      icon={faPlus}
      key={key}
    />
  )

  const BtnTest = ({ key }) => (
    <TitleButton
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
      variable: null,
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
      variable: 'products',
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
      variable: 'productTypes',
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
      variable: 'sets',
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
      variable: 'setTypes',
    }, // 1
    {
      id: 5,
      group: null,
      name: 'Параметры учетной записи',
      header: 'Параметры учетной записи',
      pageContent: UserContent,
      pageButtons: [],
      backToPageId: null,
      variable: null,
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
      variable: 'users',
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
      variable: 'invitations',
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
      variable: null,
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
      variable: null,
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
      variable: 'productCirculations',
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
    } else if (!loading) {
      const fetching = async () => {
        // const result = await fetchingAll(setData)
        await fetchingAll((result) => {
          dispatch(setAllData(result))
        })

        // await dispatch(setModalsFunctions(result))
      }
      fetching()
    }
  }, [!!session, loading])

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
              {/* {modal} */}
              {/* {confirmModal} */}
              {/* {data.modals.map((Modal, index) => (
                <Modal key={'modal' + index} />
              ))} */}
              {Object.keys(data.modals).map((key) => {
                const Modal = data.modals[key]
                return (
                  <Modal
                    key={'modal' + key}
                    onClose={() => dispatch(removeAllModals(key))}
                  />
                )
              })}
              {/* {data.modal} */}
              <Cabinet
                page={page}
                setPageId={setPageId}
                menuCfg={menuCfg(pages, pagesGroups, session.user.role)}
                user={session.user}
                onSignOut={signOut}
                modals={modals}
                data={data}
              />
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
