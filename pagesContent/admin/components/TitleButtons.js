import TitleButton from '@admincomponents/TitleButton'
import { faBug, faPlus } from '@fortawesome/free-solid-svg-icons'

export const BtnAddProduct = ({ key, modals }) => (
  <TitleButton onClick={() => modals.products.open()} icon={faPlus} key={key} />
)

export const BtnAddSet = ({ key, modals }) => (
  <TitleButton onClick={() => modals.sets.open()} icon={faPlus} key={key} />
)

export const BtnAddProductType = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.productTypes.open()}
    icon={faPlus}
    key={key}
  />
)

export const BtnAddSetType = ({ key, modals }) => (
  <TitleButton onClick={() => modals.setTypes.open()} icon={faPlus} key={key} />
)

export const BtnAddInvitation = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.invitations.open()}
    icon={faPlus}
    key={key}
  />
)

export const BtnAddProductCirculation = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.productCirculations.open()}
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
  <TitleButton onClick={() => modals.clients.open()} icon={faPlus} key={key} />
)

export const BtnAddOrder = ({ key, modals }) => (
  <TitleButton onClick={() => modals.orders.open()} icon={faPlus} key={key} />
)

export const BtnAddPayment = ({ key, modals }) => (
  <TitleButton onClick={() => modals.payments.open()} icon={faPlus} key={key} />
)

export const BtnAddDevToDo = ({ key, modals }) => (
  <TitleButton onClick={() => modals.devToDo.open()} icon={faPlus} key={key} />
)

export const BtnAddDistrict = ({ key, modals }) => (
  <TitleButton
    onClick={() => modals.districts.open()}
    icon={faPlus}
    key={key}
  />
)
