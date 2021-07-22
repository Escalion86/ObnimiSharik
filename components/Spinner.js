const Spinner = () => {
  return (
    <div className="relative w-16 h-16 p-4">
      <svg
        className="absolute top-0 left-0 w-16 h-16 mr-3 animate-spin text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <img src="/img/balloon.webp" alt="balloon" width={40} height={40} />
    </div>
  )
}

export default Spinner
