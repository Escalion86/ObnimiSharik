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
import OverviewContent from '@adminblocks/content/OverviewContent'
import {
  BtnAddInvitation,
  BtnAddProduct,
  BtnAddProductCirculation,
  BtnAddProductType,
  BtnAddSet,
  BtnAddSetType,
  BtnTest,
} from '@components/TitleButtons'
import { setPage } from '@state/actions/pageActions'
// import { setSets } from '@state/actions/setsActions'
// import { setProducts } from '@state/actions/productsActions'
// import { setSetTypes } from '@state/actions/setTypesActions'
// import { setProductTypes } from '@state/actions/productTypesActions'
// import { setUsers } from '@state/actions/usersActions'
// import { setInvitations } from '@state/actions/invitationsActions'
// import { setProductCirculations } from '@state/actions/productCirculationsActions'
import { pages, pagesGroups } from '@adminblocks/pages'

const menuCfg = (pages, pagesGroups, userRole) =>
  pagesGroups.reduce((totalGroups, group) => {
    const pagesItems = pages.reduce((totalPages, page) => {
      if (
        page.group === group.id &&
        (userRole === 'dev' || page.accessRoles.includes(userRole))
      )
        totalPages.push(page)
      return totalPages
    }, [])
    if (pagesItems.length > 0)
      totalGroups.push({ name: group.name, items: pagesItems })
    return totalGroups
  }, [])

export default function Admin() {
  const [session, loading] = useSession()

  const state = useSelector((state) => state)

  const dispatch = useDispatch()

  const modals = !loading
    ? modalsFunctions(
        dispatch,
        state,
        session?.user ? session?.user?.role : 'client'
      )
    : null

  // const router = useRouter()
  // const [page, setPage] = useState(pages[0])
  const { page } = state

  useEffect(() => {
    if (!session && !loading) {
      signIn('google')
    } else if (!loading) {
      const fetching = async () => {
        // const result = await fetchingAll(setData)
        await fetchingAll((result) => {
          if (result) dispatch(setAllData(result))
        })

        // await dispatch(setModalsFunctions(result))
      }
      fetching()
    }
  }, [!!session, loading])

  const setPageId = (id, props = {}) => {
    pages.some((page) => {
      if (page.id === id) {
        dispatch(setPage(page))
        // setPage({ ...page, ...props })
        return true
      }
    })
  }

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
              {/* {state.modals.map((Modal, index) => (
                <Modal key={'modal' + index} />
              ))} */}
              {Object.keys(state.modals).map((key) => {
                const Modal = state.modals[key]
                return (
                  <Modal
                    key={'modal' + key}
                    onClose={() => dispatch(removeModal(key))}
                  />
                )
              })}
              {/* {state.modal} */}
              <Cabinet
                page={page}
                setPageId={setPageId}
                menuCfg={menuCfg(pages, pagesGroups, session.user.role)}
                user={session.user}
                onSignOut={signOut}
                modals={modals}
                state={state}
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
