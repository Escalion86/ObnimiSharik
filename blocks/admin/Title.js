import React from 'react'

const Title = ({ text = '', btnOnClick = null, buttons = [] }) => {
  return (
    <div className="sticky top-0 flex items-center justify-center bg-white border-b border-gray-200">
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
      {text ? (
        <h2 className="flex-1 px-2 py-2 text-2xl font-semibold leading-tight text-gray-900">
          {text}
        </h2>
      ) : null}
      {buttons}
    </div>
  )
}

export default Title
