import React, { useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import Fab from '@admincomponents/Fab'

const Content = ({
  data,
  itemContent,
  onFabClick = null,
  messageIfNoData = null,
}) => {
  const [fabShow, setFabShow] = useState(true)
  const ref = useRef(0)
  if (!(data && data.length > 0))
    return messageIfNoData ? (
      <div className="px-3">{messageIfNoData}</div>
    ) : null

  return (
    <div className="relative w-full h-full overflow-y-hidden">
      <Virtuoso
        data={data}
        // itemsRendered={(items) => {
        //   if (items.length === data.length) setFabShow(true)
        // }}
        onWheel={(e) => setFabShow(e.deltaY < 0)}
        onScroll={(e) => {
          e.target.scrollTop > ref.current
            ? setFabShow(false)
            : setFabShow(true)
          ref.current = e.target.scrollTop
        }}
        // atBottomStateChange={(isBottom) => setFabShow(!isBottom)}
        itemContent={itemContent}
      />
      {onFabClick && <Fab show={fabShow} onClick={onFabClick} />}
    </div>
  )
}

export default Content
