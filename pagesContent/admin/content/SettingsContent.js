import React from 'react'
import IconButton from '@admincomponents/IconButton'
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'
import SubTitle from '@admincomponents/SubTitle'

const SettingsContent = ({ data, modals, loggedUser }) => {
  return (
    <div className="px-3">
      <SubTitle title="Экспорт/Импорт" />
      <IconButton
        name="Импорт CSV из Tilda"
        onClick={() => modals.openTildaImportModal()}
        inverse
        icon={faDownload}
      />
    </div>
  )
}

export default SettingsContent
