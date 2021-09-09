import React, { useState, useCallback, useMemo } from 'react'
// import axios from 'axios'
// import logo from './logo.svg'

import SidePanel from '@adminblocks/SidePanel'
import Header from '@adminblocks/Header'
import { DEFAULT_USER } from '@helpers/constants'
// import Account from './PageContent/Account'
// import Title from './Components/Title'
import Title from '@adminblocks/Title'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TitleButton from '@admincomponents/TitleButton'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { toggleProductsFilterShow } from '@state/actions/filterActions'
import compareObjects from '@helpers/compareObjects'
import { initialState as filterInitialState } from '@state/reducers/filterReducer'
import Filter from '@admincomponents/filter/Filter'
// import ContentContainer from './content/ContentContainer'

const Cabinet = ({
  page,
  setPageId,
  // courses,
  menuCfg,
  user = DEFAULT_USER,
  // setUser,
  onSignOut,
  modals,
  data,
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
    [JSON.stringify(data), page.pageContent]
  )

  let pageButtons = page.pageButtons ? page.pageButtons : []

  const filterExists =
    page.filterName && Object.keys(data.filter[page.filterName]).length > 0

  // // // const pageButtons = []
  // let Filter
  // // let onClickBtnFilter = () => {}
  // switch (page.filterName) {
  //   case 'products':
  //     Filter = ProductsFilter
  //   // onClickBtnFilter = () => dispatch(toggleProductsFilterShow())
  // }

  const btnFilterActive = useMemo(
    () =>
      !compareObjects(
        data.filter[page.filterName],
        filterInitialState[page.filterName]
      ),
    [page.filterName, JSON.stringify(data.filter[page.filterName])]
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

  if (filterExists) pageButtons = [...pageButtons, BtnFilter]
  // // if (page.pageButtons) pageButtons = [...pageButtons, ...buttons]
  // // pageButtons = page.pageButtons ? page.pageButtons : []

  const buttons = pageButtons.map((button, index) =>
    button({ key: 'titleButton' + index })
  )

  let filteredData = null
  if (page.filterName) {
    if (!filterExists) filteredData = data[page.filterName]
    else
      filteredData = data[page.filterName].filter(
        (item) =>
          (data.filter[page.filterName].price === undefined ||
            ((data.filter[page.filterName].price[0] === null ||
              item.price >= data.filter[page.filterName].price[0] * 100) &&
              (data.filter[page.filterName].price[1] === null ||
                item.price <= data.filter[page.filterName].price[1] * 100))) &&
          (data.filter[page.filterName].count === undefined ||
            ((data.filter[page.filterName].count[0] === null ||
              item.count >= data.filter[page.filterName].count[0]) &&
              (data.filter[page.filterName].count[1] === null ||
                item.count <= data.filter[page.filterName].count[1]))) &&
          (data.filter[page.filterName].productTypes === undefined ||
            data.filter[page.filterName].productTypes === null ||
            item.typesId.some((type) =>
              data.filter[page.filterName].productTypes.includes(type)
            )) &&
          (data.filter[page.filterName].setTypes === undefined ||
            data.filter[page.filterName].setTypes === null ||
            item.typesId.some((type) =>
              data.filter[page.filterName].setTypes.includes(type)
            )) &&
          (data.filter[page.filterName].purchase === undefined ||
            (item.purchase === true &&
              data.filter[page.filterName].purchase[1]) ||
            (item.purchase === false &&
              data.filter[page.filterName].purchase[0]))
      )
  }

  return (
    <div className="flex h-screen max-h-screen overflow-y-hidden">
      <SidePanel
        menuCfg={menuCfg}
        menuOpen={menuOpen}
        setPageId={setPageId}
        activePageId={page.id}
        closeMenu={closeMenu}
      />
      <div
        className="relative grid flex-1 max-h-screen min-w-0 "
        style={{ gridTemplateRows: '3.8rem 1fr' }}
      >
        <Header
          user={user}
          menuOpen={menuOpen}
          setPageId={setPageId}
          onClickBurger={toggleMenu}
          closeMenu={closeMenu}
          onSignOut={onSignOut}
        />
        {/* <ContentContainer page={page} data={data}>
          <PageContent
            // data={data}
            // setModal={setModal}
            // updateData={updateData}
            modals={modals}
            user={user}
          />
        </ContentContainer> */}
        <main className="flex flex-col flex-1 overflow-y-auto">
          <Title
            title={
              page.header +
              (filterExists
                ? ' ' +
                  filteredData.length +
                  ' / ' +
                  data[page.filterName].length
                : '')
            }
            buttons={buttons}
          />
          <div className="relative">
            {filterExists && (
              <Filter
                data={data}
                filterName={page.filterName}
                show={filterShow}
                setHideFilter={() => setFilterShow(false)}
              />
            )}
          </div>

          <div className="relative flex flex-col flex-1 max-h-full px-3 pb-3 overflow-y-scroll">
            <div className="relative flex flex-col flex-1 h-full">
              <PageContent
                data={filteredData}
                // setModal={setModal}
                // updateData={updateData}
                modals={modals}
                user={user}
              />
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Cabinet
