import { DistrictCard } from '@admincomponents/cards'
import Content from './Content'

const DistrictsContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const accessToContent = loggedUser.access.districts

  return (
    <Content
      data={data}
      itemContent={(index, district) => {
        const checked = selectedItems.find((item) => item._id === district._id)
        return (
          <DistrictCard
            key={district._id}
            district={district}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter(
                            (item) => item._id !== district._id
                          )
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== district._id
                            ),
                            district,
                          ]
                    )
                : null
            }
            loggedUser={loggedUser}
            onClick={() => modals.districts.open(district)}
            onEdit={
              accessToContent.edit(district)
                ? () => modals.districts.open(district, null, null, true)
                : null
            }
            onDelete={
              accessToContent.delete(district)
                ? () => modals.districts.delete(district)
                : null
            }
          />
        )
      }}
      onFabClick={accessToContent.add ? () => modals.districts.open() : null}
      messageIfNoData="Адресов доставки нет"
    />
  )
}

export default DistrictsContent
