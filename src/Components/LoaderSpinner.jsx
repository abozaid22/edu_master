
export default function LoaderSpinner() {
  return (
    <>
    <div className="h-dvh flex flex-col justify-center items-center bg-gray-200">
      <div className="w-12 h-12 border-4 border-gray-400 border-t-gray-900 rounded-full animate-spin"></div>
      <p className="text-gray-700 text-xl font-semibold mt-4">Loading...</p>
    </div>
    </>
  )
}
