import { PaymentCard } from '@admincomponents/cards'
import Content from './Content'

const PaymentsContent = ({ data, modals, loggedUser }) => {
  const accessToContent = loggedUser.access.payments

  return (
    <Content
      data={data}
      itemContent={(index, payment) => (
        <PaymentCard
          key={payment._id}
          payment={payment}
          loggedUser={loggedUser}
          onClick={() => modals.openPaymentModal(payment)}
          onEdit={
            accessToContent.edit(payment)
              ? () => modals.openPaymentModal(payment, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(payment)
              ? () => modals.openDeletePayment(payment)
              : null
          }
        />
      )}
      onFabClick={accessToContent.add ? () => modals.openPaymentModal() : null}
      messageIfNoData="Транзакций нет"
    />
  )
}

export default PaymentsContent
