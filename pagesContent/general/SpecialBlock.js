import Block from '@components/Block'
import Title from '@components/Title'
import SpecialCard from '@components/SpecialCard'

const SpecialBlock = () => (
  <Block>
    <div className="px-10 pt-6 pb-8 overflow-hidden overflow-x-auto bg-white shadow-medium rounded-2xl mt-52">
      <Title title="Акции и скидки" small />
      <div
        className="flex justify-between space-x-2 min-w-min"
        // style={{ width: 950 }}
      >
        <SpecialCard src="img/special/1.png" />
        <SpecialCard src="img/special/2.png" />
        <SpecialCard src="img/special/3.png" />
        <SpecialCard src="img/special/4.png" />
        <SpecialCard src="img/special/5.png" />
      </div>
    </div>
  </Block>
)

export default SpecialBlock
