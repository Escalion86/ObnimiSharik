import React, { useState, useCallback, useMemo, useRef } from 'react'

import SidePanel from '@adminblocks/SidePanel'
import Header from '@adminblocks/Header'
import { DEFAULT_USER } from '@helpers/constants'
import Title from '@adminblocks/Title'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TitleButton from '@admincomponents/TitleButton'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import compareObjects from '@helpers/compareObjects'
import { initialState as filterInitialState } from '@state/reducers/filterReducer'
import Filter from '@admincomponents/filter/Filter'

import SortTitleButtonMenu from '@admincomponents/SortTitleButtonMenu'

const Cabinet = ({
  page,
  setPageId,
  // courses,
  menuCfg,
  loggedUser = DEFAULT_USER,
  // setUser,
  onSignOut,
  modals,
  state,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filterShow, setFilterShow] = useState(false)
  const toggleFilterShow = () => setFilterShow(!filterShow)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }

  const PageContent = useCallback(
    (data) =>
      page?.pageContent ? (
        page.pageContent(data)
      ) : (
        <div className="flex items-center justify-center h-full text-xl">
          Страница в разработке
        </div>
      ),
    [JSON.stringify(state), page.pageContent]
  )

  let pageButtons = []

  // const accessToAddItem = page.variable
  //   ? loggedUser?.access[page.variable].add
  //   : false
  // let pageButtons = accessToAddItem && page.addButton ? [page.addButton] : []

  const filterExists = !!(
    page.variable &&
    state[page.variable]?.length &&
    state.filter[page.variable] &&
    Object.keys(state.filter[page.variable]).length > 0
  )
  const sortingExists = !!(
    page.variable &&
    state[page.variable]?.length &&
    state.sorting[page.variable] &&
    Object.keys(state.sorting[page.variable]).length > 0
  )

  // // // const pageButtons = []
  // let Filter
  // // let onClickBtnFilter = () => {}
  // switch (page.variable) {
  //   case 'products':
  //     Filter = ProductsFilter
  //   // onClickBtnFilter = () => dispatch(toggleProductsFilterShow())
  // }

  const btnFilterActive = useMemo(
    () =>
      !compareObjects(
        state.filter[page.variable],
        filterInitialState[page.variable]
      ),
    [page.variable, JSON.stringify(state.filter[page.variable])]
  )

  const BtnFilter = ({ key }) => (
    <TitleButton
      onClick={toggleFilterShow}
      key={key}
      icon={faFilter}
      active={btnFilterActive}
      // warning={data.filter.products.show}
    />
  )

  const BtnSort = ({ key }) => (
    <SortTitleButtonMenu state={state} key={key} variable={page.variable} />
  )

  if (filterExists) pageButtons = [BtnFilter, ...pageButtons]
  if (sortingExists) pageButtons = [BtnSort, ...pageButtons]
  // // if (page.pageButtons) pageButtons = [...pageButtons, ...buttons]
  // // pageButtons = page.pageButtons ? page.pageButtons : []

  const buttons = pageButtons.map((button, index) =>
    button({ key: 'titleButton' + index, modals })
  )

  let filteredData = null
  if (page.variable && page.variable !== 'dev') {
    const accessToContent = loggedUser.access[page.variable]
    if (!filterExists)
      filteredData = state[page.variable].filter((item) =>
        accessToContent.read(item)
      )
    else
      filteredData = state[page.variable]
        .filter((item) => accessToContent.read(item))
        .filter(
          (item) =>
            (!state.filter[page.variable].name ||
              item.name
                ?.toString()
                .toLowerCase()
                .includes(state.filter[page.variable].name.toLowerCase())) &&
            (state.filter[page.variable].price === undefined ||
              ((state.filter[page.variable].price[0] === null ||
                item.price >= state.filter[page.variable].price[0] * 100) &&
                (state.filter[page.variable].price[1] === null ||
                  item.price <= state.filter[page.variable].price[1] * 100))) &&
            (state.filter[page.variable].count === undefined ||
              ((state.filter[page.variable].count[0] === null ||
                item.count >= state.filter[page.variable].count[0]) &&
                (state.filter[page.variable].count[1] === null ||
                  item.count <= state.filter[page.variable].count[1]))) &&
            (state.filter[page.variable].productTypes === undefined ||
              state.filter[page.variable].productTypes === null ||
              item.typesId.some((type) =>
                state.filter[page.variable].productTypes.includes(type)
              )) &&
            (state.filter[page.variable].setTypes === undefined ||
              state.filter[page.variable].setTypes === null ||
              item.typesId.some((type) =>
                state.filter[page.variable].setTypes.includes(type)
              )) &&
            (state.filter[page.variable].purchase === undefined ||
              (item.purchase === true &&
                state.filter[page.variable].purchase[1]) ||
              (item.purchase === false &&
                state.filter[page.variable].purchase[0])) &&
            (state.filter[page.variable].status === undefined ||
              state.filter[page.variable].status.find(
                (stat) => stat.value === item.status
              )?.checked) &&
            (state.filter[page.variable].priority === undefined ||
              state.filter[page.variable].priority.find(
                (prior) => prior.value === item.priority
              )?.checked) &&
            (state.filter[page.variable].gender === undefined ||
              !item.gender ||
              state.filter[page.variable].gender.find(
                (gen) => gen.value === item.gender
              )?.checked) &&
            (state.filter[page.variable].payType === undefined ||
              state.filter[page.variable].payType.find(
                (prior) => prior.value === item.payType
              )?.checked)
        )
  }
  if (state.sorting[page.variable]) {
    const sortKey = state.sorting[page.variable][0]
    const sortValue = state.sorting[page.variable][1]
    filteredData = filteredData.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortValue === 'DESC' ? 1 : -1
      }
      if (a[sortKey] > b[sortKey]) {
        return sortValue === 'DESC' ? -1 : 1
      }
      return 0
    })
  }

  return (
    <div className="flex h-screen max-h-screen overflow-y-hidden">
      <SidePanel
        menuCfg={menuCfg}
        menuOpen={menuOpen}
        setPageId={setPageId}
        activePageId={page.id}
        closeMenu={closeMenu}
        modals={modals}
      />
      <div
        className="relative grid flex-1 max-h-screen min-w-0 "
        style={{ gridTemplateRows: '3.8rem 1fr' }}
      >
        <Header
          loggedUser={loggedUser}
          menuOpen={menuOpen}
          setPageId={setPageId}
          onClickBurger={toggleMenu}
          closeMenu={closeMenu}
          onSignOut={onSignOut}
          modals={modals}
        />
        <main className="flex flex-col flex-1 overflow-y-auto">
          <Title
            title={page?.name ?? ''}
            subTitle={
              filterExists &&
              (loggedUser.role === 'admin' || loggedUser.role === 'dev')
                ? ' ' +
                  filteredData.length +
                  ' / ' +
                  state[page.variable].length
                : null
            }
            buttons={buttons}
          />
          <div className="relative">
            {filterExists && (
              <Filter
                state={state}
                variable={page.variable}
                show={filterShow}
                setHideFilter={() => setFilterShow(false)}
              />
            )}
          </div>

          {/* <div className="relative flex flex-col flex-1 max-h-full px-3 pb-3 overflow-y-scroll">
            <div className="relative flex flex-col flex-1 h-full"> */}
          <div className="h-full overflow-y-auto">
            <PageContent
              data={filteredData}
              // setModal={setModal}
              // updateData={updateData}
              modals={modals}
              loggedUser={loggedUser}
            />
          </div>
          {/* </div>
          </div> */}
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Cabinet
