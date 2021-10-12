import React from 'react'
import { PaymentCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const PaymentsContent = ({ data, modals, user }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Транзакций нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, payment) => (
        <PaymentCard
          key={payment._id}
          payment={payment}
          role={user.role}
          onClick={() => modals.openPaymentModal(payment)}
          onEdit={() => modals.openPaymentModal(payment, true)}
          onDelete={() => modals.openDeletePayment(payment)}
        />
      )}
    />
  )
}

export default PaymentsContent
