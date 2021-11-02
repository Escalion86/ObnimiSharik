import Modal from '@adminblocks/modals/Modal'
import formatDate from '@helpers/formatDate'
import useWindowDimensions from '@helpers/useWindowDimensions'
import versionHistory from '@helpers/versionHistory'

const VersionHistoryModal = ({ onClose = () => {} }) => {
  const { height } = useWindowDimensions()
  return (
    <Modal onClose={onClose} noPropsToChildren>
      <div className="flex flex-col" style={{ maxHeight: height - 100 }}>
        <div className="text-lg font-semibold text-center">История версий</div>
        <div className="flex flex-col flex-1 overflow-y-auto gap-y-2">
          {versionHistory.map(
            ({ ver, date, add = null, update = null, fix = null }) => (
              <div key={ver} className="py-0.5">
                <div className="flex italic font-bold">{`v${ver} (${formatDate(
                  date
                )})`}</div>
                <div className="flex flex-col text-sm gap-y-1">
                  {add && (
                    <div className="flex flex-col ml-2">
                      <div className="italic">Добавлено:</div>
                      {add.map((item, index) => (
                        <div
                          className="ml-2 leading-4"
                          key={ver + 'add' + index}
                        >{`- ${item}`}</div>
                      ))}
                    </div>
                  )}
                  {update && (
                    <div className="flex flex-col ml-2">
                      <div className="italic">Обновлено:</div>
                      {update.map((item, index) => (
                        <div
                          className="ml-2 leading-4"
                          key={ver + 'update' + index}
                        >{`- ${item}`}</div>
                      ))}
                    </div>
                  )}
                  {fix && (
                    <div className="flex flex-col ml-2">
                      <div className="italic">Исправлено:</div>
                      {fix.map((item, index) => (
                        <div
                          className="ml-2 leading-4"
                          key={ver + 'fix' + index}
                        >{`- ${item}`}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Modal>
  )
}

export default VersionHistoryModal
