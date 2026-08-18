import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from '../navigation/BottomNav'

export default function MainLayout() {
  const location = useLocation()
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="flex h-screen overflow-hidden bg-cream-100">
      <aside className="hidden w-[200px] shrink-0 flex-col border-r border-bark-100/80 bg-cream-50 lg:flex">
        <Sidebar />
      </aside>

      <main ref={contentRef} className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <Outlet />
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>
    </div>
  )
}
