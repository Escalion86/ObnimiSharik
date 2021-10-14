import TitleButton from '@admincomponents/TitleButton'
import { faBug, faPlus } from '@fortawesome/free-solid-svg-icons'

export const BtnAddProduct = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.openProductModal()}
    icon={faPlus}
    key={key}
  />
)

export const BtnAddSet = ({ key, modals }) => (
  <TitleButton onClick={() => modals.openSetModal()} icon={faPlus} key={key} />
)

export const BtnAddProductType = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.openProductTypeModal()}
    icon={faPlus}
    key={key}
  />
)

export const BtnAddSetType = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.openSetTypeModal()}
    icon={faPlus}
    key={key}
  />
)

export const BtnAddInvitation = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.openInvitationModal()}
    icon={faPlus}
    key={key}
  />
)

export const BtnAddProductCirculation = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.openProductCirculationModal()}
    icon={faPlus}
    key={key}
  />
)

export const BtnTest = ({ key, modals }) => (
  <TitleButton
    onClick={() =>
      modals.openConfirmModal('Заголовок', 'Текст сообщения', () =>
        console.log('Принято')
      )
    }
    icon={faBug}
    key={key}
  />
)

export const BtnAddClient = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.openClientModal()}
    icon={faPlus}
    key={key}
  />
)

export const BtnAddOrder = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.openOrderModal()}
    icon={faPlus}
    key={key}
  />
)

export const BtnAddPayment = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.openPaymentModal()}
    icon={faPlus}
    key={key}
  />
)

export const BtnAddDevToDo = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.openDevToDoModal()}
    icon={faPlus}
    key={key}
  />
)
