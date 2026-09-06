import { useEffect, useState } from 'react'

type Forecast = {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string | null
}

function App() {
  const [forecasts, setForecasts] = useState<Forecast[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        const res = await fetch('/api/forecasts')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: Forecast[] = await res.json()
        if (!ignore) setForecasts(data)
      } catch (e) {
        if (!ignore) setError(String(e))
      }
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

export default App
