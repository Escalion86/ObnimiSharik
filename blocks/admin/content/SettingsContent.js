import React from 'react'
import IconButton from '@components/IconButton'
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'

const SubTitle = ({ title }) => (
  <div className="my-1 ml-2 text-lg font-semibold">{title}</div>
)

const SettingsContent = ({ data, modals }) => {
  return (
    <div>
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
