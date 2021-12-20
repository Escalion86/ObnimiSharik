import React from 'react'

const Title = ({
  title = '',
  subTitle = null,
  btnOnClick = null,
  buttons = null,
}) => {
  return (
    <div className="flex items-center justify-center gap-1 px-1 py-1 bg-white border-b border-gray-200">
      {btnOnClick !== null && btnOnClick !== undefined && (
        <div>
          <a
            className="flex items-center justify-between px-2 py-1 rounded-lg cursor-pointer hover:bg-hover"
            onClick={btnOnClick}
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M19 13H6.75L12 18.25l-.664.75l-6.5-6.5l6.5-6.5l.664.75L6.75 12H19v1z"
              />
            </svg>
            {/* <span className="text-sm font-medium text-gray-600">Назад</span> */}
          </a>
        </div>
      )}
      <div className="flex flex-col justify-start flex-1 px-1 tablet:items-center gap-x-2 tablet:flex-row">
        <h2 className="text-xl font-semibold leading-tight text-gray-900 tablet:text-2xl">
          {title}
        </h2>
        <div className={'text-sm tablet:text-2xl '}>
          {subTitle && <div>{subTitle}</div>}
        </div>
      </div>
      {buttons}
    </div>
  )
}

export default Title
