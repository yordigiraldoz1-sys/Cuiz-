import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { CheckCircle, XCircle, GripVertical } from 'lucide-react'

interface DragAndDropProps {
  question: string
  items: string[]
  correctMapping: Record<string, string>
  explanation: string
  onSubmit: (mapping: Record<string, string>, isCorrect: boolean) => void
  disabled?: boolean
}

export default function DragAndDrop({
  question,
  items,
  correctMapping,
  explanation,
  onSubmit,
  disabled = false,
}: DragAndDropProps) {
  const [availableItems, setAvailableItems] = useState<string[]>(items)
  const [slots, setSlots] = useState<Record<string, string | null>>(
    Object.keys(correctMapping).reduce((acc, key) => ({ ...acc, [key]: null }), {} as Record<string, string | null>)
  )
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleDragEnd = (result: DropResult) => {
    if (disabled || answered) return

    const { source, destination } = result
    if (!destination) return

    if (source.droppableId === 'available' && destination.droppableId !== 'available') {
      const item = availableItems[source.index]
      const newAvailable = [...availableItems]
      newAvailable.splice(source.index, 1)
      setAvailableItems(newAvailable)

      const newSlots = { ...slots }
      const existingItem = newSlots[destination.droppableId]
      if (existingItem) {
        newAvailable.push(existingItem)
      }
      newSlots[destination.droppableId] = item
      setSlots(newSlots)
    } else if (source.droppableId !== 'available' && destination.droppableId === 'available') {
      const item = slots[source.droppableId]
      if (item) {
        const newAvailable = [...availableItems]
        newAvailable.splice(destination.index, 0, item)
        setAvailableItems(newAvailable)

        const newSlots = { ...slots }
        newSlots[source.droppableId] = null
        setSlots(newSlots)
      }
    }
  }

  const handleSubmit = () => {
    if (disabled) return

    const correct = Object.entries(correctMapping).every(
      ([key, value]) => slots[key] === value
    )
    setIsCorrect(correct)
    setAnswered(true)
    onSubmit(slots as Record<string, string>, correct)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{question}</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          <Droppable droppableId="available" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl min-h-[60px]"
              >
                {availableItems.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index} isDragDisabled={answered || disabled}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical size={16} className="text-gray-400" />
                        <span>{item}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="space-y-3">
            {Object.keys(slots).map((slotKey) => (
              <Droppable key={slotKey} droppableId={slotKey}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex items-center gap-3 p-3 border-2 border-dashed rounded-xl min-h-[50px] ${
                      answered
                        ? slots[slotKey] === correctMapping[slotKey]
                          ? 'border-correct bg-correct/10'
                          : 'border-incorrect bg-incorrect/10'
                        : 'border-gray-300'
                    }`}
                  >
                    <span className="font-medium text-gray-700 min-w-[100px]">{slotKey}:</span>
                    {slots[slotKey] ? (
                      <div className="flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-lg">
                        <span>{slots[slotKey]}</span>
                        {!answered && (
                          <button
                            onClick={() => {
                              const newAvailable = [...availableItems, slots[slotKey]!]
                              setAvailableItems(newAvailable)
                              const newSlots = { ...slots }
                              newSlots[slotKey] = null
                              setSlots(newSlots)
                            }}
                            className="text-gray-400 hover:text-red-500"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Arrastra aquí</span>
                    )}
                    {answered && slots[slotKey] === correctMapping[slotKey] && (
                      <CheckCircle size={20} className="text-correct ml-auto" />
                    )}
                    {answered && slots[slotKey] !== correctMapping[slotKey] && (
                      <XCircle size={20} className="text-incorrect ml-auto" />
                    )}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>

      {answered && (
        <div className={`p-4 rounded-xl ${isCorrect ? 'bg-correct/10 border border-correct/30' : 'bg-incorrect/10 border border-incorrect/30'}`}>
          <div className={`flex items-center gap-2 font-semibold ${isCorrect ? 'text-correct' : 'text-incorrect'}`}>
            {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </div>
          {!isCorrect && (
            <div className="mt-2 text-gray-600">
              <p>Respuesta correcta:</p>
              <ul className="list-disc list-inside">
                {Object.entries(correctMapping).map(([key, value]) => (
                  <li key={key}>{key}: {value}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-2 text-gray-600">{explanation}</p>
        </div>
      )}

      {!answered && (
        <button
          onClick={handleSubmit}
          disabled={Object.values(slots).some((v) => v === null)}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verificar
        </button>
      )}
    </div>
  )
}
