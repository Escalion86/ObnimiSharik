import {
  faCheck,
  faCheckSquare,
  faEye,
  faEyeSlash,
  faSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import IconButton from './IconButton'
import cn from 'classnames'

const MultiselectMenu = ({
  show = false,
  selectedIdsCount = 0,
  onClickDelete = null,
  onClickSelectAll = null,
  onClickUnselectAll = null,
  onClickShowOnSite = null,
  onClickUnshowOnSite = null,
}) => {
  return (
    <div
      className={cn(
        'bg-white overflow-hidden gap-x-1 px-1 z-20 w-full transition-scale duration-500 ease-in-out top-0 flex items-center p-0 border-b border-gray-200',
        show ? 'h-10' : 'h-0 scale-y-0 -translate-y-1/2'
      )}
      // className={"duration-500 ease-in-out bg-green-500 transition-height"+(show ? ' h-15 hover:h-40' : ' h-0 '))
    >
      <IconButton
        onClick={onClickSelectAll}
        small
        icon={faCheckSquare}
        inverse
        name="Выбрать все"
      />
      <IconButton
        onClick={onClickUnselectAll}
        small
        icon={faSquare}
        inverse
        name="Снять выделение"
      />
      <div>Действия:</div>
      <IconButton
        onClick={onClickDelete}
        small
        icon={faTrash}
        inverse
        disabled={selectedIdsCount === 0}
        className="bg-red-400"
        // name="Удалить"
      />
      {/* <IconButton
        onClick={onClickShowOnSite}
        small
        icon={faEye}
        inverse
        // name="Показать на сайте"
      />
      <IconButton
        onClick={onClickUnshowOnSite}
        small
        icon={faEyeSlash}
        inverse
        // name="Не показывать на сайте"
      /> */}
    </div>
  )
}

export default MultiselectMenu
