const InfoItem = ({ src, text }) => (
  <div className="flex items-center justify-center">
    <div className="flex items-center justify-between space-x-2 w-80">
      <img src={src} alt="info" className="w-14 h-14" />
      <div className="text-base font-light text-white">{text}</div>
    </div>
  </div>
)

export default InfoItem
