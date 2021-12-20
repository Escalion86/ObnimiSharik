const DeliveryPriceItem = ({ color, price, text, text2 }) => (
  <div className="flex justify-center flex-1 min-w-36">
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold text-gray-600">{price}₽</div>
      <div className="text-base font-light text-black">{text}</div>
      {text2 && <div className="text-base font-light text-black">{text2}</div>}
      {color && (
        <div
          className="w-full h-3 mt-2"
          style={{ backgroundColor: color, opacity: 0.35 }}
        />
      )}
    </div>
  </div>
)

export default DeliveryPriceItem
