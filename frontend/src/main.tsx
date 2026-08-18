import React, { Component, type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (!this.state.error) return this.props.children
    return <main className="flex min-h-screen items-center justify-center bg-cream-100 p-5"><section className="w-full max-w-lg rounded-3xl border border-incorrect/30 bg-white p-8 shadow-card"><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-incorrect">Error de carga</p><h1 className="mt-3 text-2xl font-extrabold text-bark-800">CUIZ no pudo cargar esta pantalla</h1><p className="mt-3 text-sm font-semibold leading-relaxed text-bark-500">Recarga la página. Si el problema continúa, comparte el detalle para corregirlo.</p><pre className="mt-5 overflow-auto rounded-xl bg-cream-50 p-3 text-xs text-bark-600">{this.state.error.message}</pre><button type="button" onClick={() => window.location.reload()} className="mt-6 rounded-xl bg-primary-400 px-5 py-3 text-sm font-extrabold text-white">RECARGAR</button></section></main>
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppErrorBoundary><App /></AppErrorBoundary>
  </React.StrictMode>,
)
