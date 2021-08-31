const TypesInCard = ({ types = [], onClick = null }) => {
  if (types[0] === undefined) types.length = 0
  return (
    <div className="flex mt-1 space-x-2 text-sm">
      <div>Тип:</div>
      {types.length > 0 ? (
        <div className="flex flex-wrap">
          {types.map((type, index) => (
            <div className="flex" key={'type' + index}>
              <div
                className={onClick ? "cursor-pointer text-primary hover:text-toxic" : ""}
                onClick={onClick ? (event) => {
                  event.stopPropagation()
                  onClick(type)
                } : null}
              >
                {type.name}
              </div>
              {index < types.length - 1 && <div className="mr-1">, </div>}
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
