import { PaymentCard } from '@admincomponents/cards'
import Content from './Content'

const PaymentsContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const accessToContent = loggedUser.access.payments

  return (
    <Content
      data={data}
      itemContent={(index, payment) => {
        const checked = selectedItems.find((item) => item._id === payment._id)
        return (
          <PaymentCard
            key={payment._id}
            payment={payment}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter(
                            (item) => item._id !== payment._id
                          )
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== payment._id
                            ),
                            payment,
                          ]
                    )
                : null
            }
            loggedUser={loggedUser}
            onClick={() => modals.payments.open(payment)}
            onEdit={
              accessToContent.edit(payment)
                ? () => modals.payments.open(payment, null, null, true)
                : null
            }
            onDelete={
              accessToContent.delete(payment)
                ? () => modals.payments.delete(payment)
                : null
            }
          />
        )
      }}
      onFabClick={accessToContent.add ? () => modals.payments.open() : null}
      messageIfNoData="Транзакций нет"
    />
  )
}

export default PaymentsContent
