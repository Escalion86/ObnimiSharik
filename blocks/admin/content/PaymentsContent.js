import React from 'react'
import { PaymentCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const PaymentsContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Транзакций нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, payment) => (
        <PaymentCard
          key={payment._id}
          payment={payment}
          loggedUser={loggedUser}
          onClick={() => modals.openPaymentModal(payment)}
          onEdit={() => modals.openPaymentModal(payment, true)}
          onDelete={() => modals.openDeletePayment(payment)}
        />
      )}
    />
  )
}

export default PaymentsContent
