
import { useState, useRef } from 'react'
import { IconPlus } from './Icons'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState('') // success / error message shown to screen readers
  const inputRef = useRef(null)

  async function handleSubmit(e) {
    e?.preventDefault()
    const text = title.trim()
    if (!text || submitting) return

    setSubmitting(true)
    setFeedback('') // clear previous feedback

    try {
      await onAdd(text)
      setTitle('')
      // small success feedback
      setFeedback('Tarea añadida')
      // remove feedback after a short time
      setTimeout(() => setFeedback(''), 1400)
      // keep focus on input for quick entries
      inputRef.current?.focus()
    } catch (err) {
      console.error('onAdd error', err)
      setFeedback('Error al añadir tarea')
      // keep message visible a little longer on error
      setTimeout(() => setFeedback(''), 2500)
    } finally {
      setSubmitting(false)
    }
  }

  const isDisabled = submitting || title.trim().length === 0

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* accessible label (visually hidden) */}
      <label htmlFor="task-input" className="sr-only">Nueva tarea</label>

      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <input
            id="task-input"
            ref={inputRef}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="¿Qué necesitas hacer hoy?"
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
            aria-describedby="task-help"
            aria-invalid={false}
            autoComplete="off"
          />

          <div id="task-help" className="sr-only">
            Escribe la tarea y pulsa Añadir o Enter.
          </div>
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          aria-disabled={isDisabled}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
            ${isDisabled ? 'bg-slate-300 text-slate-600 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md'}`}
        >
          <IconPlus className="w-4 h-4" />
          <span>Añadir</span>
        </button>
      </div>

      {/* live region for screen readers and visual feedback */}
      <div aria-live="polite" className="mt-2 min-h-[1.1rem]">
        {feedback && (
          <div
            className={`inline-block text-sm px-3 py-1 rounded-md ${
              feedback.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
            }`}
            role="status"
          >
            {feedback}
          </div>
        )}
      </div>
    </form>
  )
}
