import React from 'react'
import IconButton from '@components/IconButton'
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'
import SubTitle from '@admincomponents/SubTitle'

const SettingsContent = ({ user, modals }) => {
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
