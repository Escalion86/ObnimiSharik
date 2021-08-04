import React from 'react'
import IconButton from '@components/IconButton'
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'
import TildaImportModal from '@adminblocks/modals/TildaImportModal'

const SubTitle = ({ title }) => (
  <div className="my-1 ml-2 text-lg font-semibold">{title}</div>
)

const SettingsContent = ({
  data,
  setModal = () => {},
  updateData = () => {},
}) => {
  return (
    <div>
      <SubTitle title="Экспорт/Импорт" />
      <IconButton
        name="Импорт CSV из Tilda"
        onClick={() =>
          setModal(() => (
            <TildaImportModal {...data} onClose={() => setModal(null)} />
          ))
        }
        inverse
        icon={faDownload}
      />
    </div>
  )
}

export default SettingsContent
