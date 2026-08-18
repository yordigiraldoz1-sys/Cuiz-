export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-bark-100 border-t-primary-400 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-bark-500 font-semibold">Cargando...</p>
      </div>
    </div>
  )
}
