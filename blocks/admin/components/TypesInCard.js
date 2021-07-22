const TypesInCard = ({ types, onClick }) => {
  if (types[0] === undefined) types.length = 0
  return (
    <div className="flex mt-1 space-x-2 text-sm">
      <div>Тип:</div>
      {types.length > 0 ? (
        <div className="flex flex-wrap gap-x-2">
          {types.map((type, index) => (
            <div
              key={'type' + index}
              className="cursor-pointer text-primary hover:text-toxic"
              onClick={() => onClick(type)}
            >
              {type.name}
            </div>
          ))}
        </div>
      ) : (
        <div>не установлено</div>
      )}
    </div>
  )
}

export default TypesInCard
