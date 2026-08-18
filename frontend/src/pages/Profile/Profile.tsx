import { Construction } from 'lucide-react'

export default function Profile() {
  return <main className="flex min-h-full items-center justify-center bg-cream-100 px-5 py-16"><section className="max-w-md rounded-[2rem] border border-bark-100 bg-white p-8 text-center shadow-card"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500"><Construction size={27} /></span><p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary-500">Mi perfil</p><h1 className="mt-2 font-display text-2xl font-extrabold text-bark-800">Estamos trabajando en esto</h1><p className="mt-3 text-sm font-semibold leading-relaxed text-bark-500">Pronto podrás ver y ajustar tu perfil desde aquí.</p></section></main>
}
