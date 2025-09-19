import React from 'react'

const LoadingButton = () => {
  return (
    <button
  type="button"
  disabled
  className="w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 transition text-[#0f172a] font-semibold py-3 rounded-lg shadow-md shadow-cyan-600/50"
>
  {/* Spinner */}
  <svg
    className="animate-spin h-5 w-5 mr-2 text-[#0f172a]"
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
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>

  Processing
</button>

  )
}

export default LoadingButton
