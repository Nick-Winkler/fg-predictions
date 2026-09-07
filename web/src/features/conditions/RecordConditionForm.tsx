import { type SyntheticEvent, useState } from 'react'
import { api } from '../../lib/api/client'
import type { RecordConditionRequest } from './types'

export function RecordConditionForm({ onRecorded }: { onRecorded: () => void }) {
  const [temperatureC, setTemperatureC] = useState('')
  const [summary, setSummary] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    const body: RecordConditionRequest = {
      temperatureC: Number(temperatureC),
      summary: summary || null,
    }

    const { error: apiError } = await api.POST('/api/conditions', { body })

    setSubmitting(false)
    if (apiError) {
      setError('Failed to record condition')
      return
    }

    setTemperatureC('')
    setSummary('')
    onRecorded()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={temperatureC}
        onChange={(e) => setTemperatureC(e.target.value)}
        placeholder="Temperature (°C)"
        required
      />
      <input
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Summary"
      />
      <button type="submit" disabled={submitting}>
        Record
      </button>
      {error && <p>{error}</p>}
    </form>
  )
}
