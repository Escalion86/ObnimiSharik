import Button from '@components/Button'
import emailSend from '@helpers/emailSend'
import React from 'react'

const TestContent = ({ data, modals, loggedUser }) => {
  console.log(`window.location.href`, window.location.href)
  const accessToContent = loggedUser.access.clients.item
  return (
    <div className="px-3">
      <Button
        onClick={() => {
          // emailSend({
          //   To: '2562020@list.ru',
          //   Subject: 'Test',
          //   Body: 'BODY',
          // })
          modals.openVersionHistoryModal()
        }}
        inverse
        name="Отправка письма"
      />
    </div>
  )
}

export default TestContent
