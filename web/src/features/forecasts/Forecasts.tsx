import { useEffect, useState } from 'react'
import { api } from '../../lib/api/client'
import type { Forecast } from './types'

export function Forecasts() {
  const [forecasts, setForecasts] = useState<Forecast[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    async function load() {
      const { data, error: apiError } = await api.GET('/api/forecasts')
      if (ignore) return
      if (apiError) setError('Failed to load forecasts')
      else setForecasts(data ?? [])
    }

    load()
    return () => {
      ignore = true
    }
  }, [])

  if (error) return <p>Error: {error}</p>
  if (!forecasts) return <p>Loading...</p>

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>°C</th>
          <th>°F</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map((f) => (
          <tr key={f.date}>
            <td>{f.date}</td>
            <td>{f.temperatureC}</td>
            <td>{f.temperatureF}</td>
            <td>{f.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
