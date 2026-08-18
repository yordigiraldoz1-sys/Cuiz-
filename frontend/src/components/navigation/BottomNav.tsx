import { Link, useLocation } from 'react-router-dom'
import { BookOpen, FileText, Home, User } from 'lucide-react'

const navItems = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/courses', icon: BookOpen, label: 'Cursos' },
  { path: '/exams', icon: FileText, label: 'Simulacro' },
  { path: '/profile', icon: User, label: 'Perfil' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav className="border-t border-bark-100 bg-white shadow-[0_-4px_16px_rgba(61,43,31,0.06)]">
      <div className="max-w-lg mx-auto px-2">
        <div className="grid grid-cols-4 items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
            return (
              <Link key={item.path} to={item.path} className={`mx-1 flex min-w-0 flex-col items-center rounded-xl px-2 py-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ${isActive ? 'bg-primary-50 text-primary-400' : 'text-bark-400 hover:text-bark-600'}`}>
                <Icon size={21} strokeWidth={isActive ? 2.75 : 2} />
                <span className={`mt-1 text-[10px] font-semibold ${isActive ? 'text-primary-500' : ''}`}>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
