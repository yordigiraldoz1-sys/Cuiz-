import { Link, useLocation } from 'react-router-dom'
import { BookOpen, FileText, User, Home } from 'lucide-react'

const navSections = [
  {
    title: 'Aprendizaje',
    items: [
      { path: '/', icon: Home, label: 'Inicio' },
      { path: '/courses', icon: BookOpen, label: 'Mis cursos' },
      { path: '/exams', icon: FileText, label: 'Simulacros' },
    ],
  },
  {
    title: 'Cuenta',
    items: [
      { path: '/profile', icon: User, label: 'Mi perfil' },
    ],
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-bark-100/70 px-5 py-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100 text-2xl shadow-sm">🐹</div>
          <div>
            <span className="block font-display text-xl font-extrabold leading-none text-bark-800">cuiz</span>
            <span className="text-[10px] font-bold tracking-[0.08em] text-primary-400">ESTUDIA CONTIGO</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {navSections.map((section) => (
          <div key={section.title} className="mb-5 last:mb-0">
            <p className="px-2 pb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-bark-300">{section.title}</p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)

                return (
                  <Link key={item.path} to={item.path} className={`sidebar-item ${isActive ? 'active' : ''}`}>
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-bark-100/70 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-extrabold text-primary-500">D</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-bark-700">Demo</p>
            <p className="truncate text-[11px] text-bark-400">Nivel 5</p>
          </div>
        </div>
      </div>
    </div>
  )
}
