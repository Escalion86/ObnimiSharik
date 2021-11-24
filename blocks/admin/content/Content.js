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

  return (
    <div className="relative w-full h-full overflow-y-hidden">
      {!(data && data.length > 0) ? (
        messageIfNoData ? (
          <div className="px-3">{messageIfNoData}</div>
        ) : null
      ) : (
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
      )}
      {onFabClick && (
        <Fab show={fabShow || !data?.length} onClick={onFabClick} />
      )}
    </div>
  )
}

export default Content
