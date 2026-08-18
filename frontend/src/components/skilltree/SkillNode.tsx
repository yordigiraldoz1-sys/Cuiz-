import { Lock, CheckCircle } from 'lucide-react'

interface SkillNodeProps {
  id: string
  title: string
  icon: string
  state: 'locked' | 'available' | 'current' | 'completed'
  alignment?: 'left' | 'center' | 'right'
  onClick: () => void
}

export default function SkillNodeComponent({ title, icon, state, alignment = 'center', onClick }: SkillNodeProps) {
  const getNodeClass = () => {
    switch (state) {
      case 'available': return 'skill-node-available'
      case 'current': return 'skill-node-current'
      case 'completed': return 'skill-node-completed'
      case 'locked': return 'skill-node-locked'
    }
  }

  const offsetX = alignment === 'left' ? -40 : alignment === 'right' ? 40 : 0

  return (
    <div
      className="flex items-center gap-3 relative z-10"
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      <button
        onClick={state !== 'locked' ? onClick : undefined}
        className={`skill-node ${getNodeClass()}`}
        disabled={state === 'locked'}
      >
        {state === 'locked' ? (
          <Lock size={18} className="text-locked" />
        ) : state === 'completed' ? (
          <CheckCircle size={22} className="text-correct" />
        ) : (
          <span>{icon}</span>
        )}
      </button>

      <div className="text-left min-w-0">
        <div className={`text-sm font-bold leading-tight ${
          state === 'locked' ? 'text-bark-300' : 'text-bark-700'
        }`}>
          {title}
        </div>
      </div>
    </div>
  )
}
