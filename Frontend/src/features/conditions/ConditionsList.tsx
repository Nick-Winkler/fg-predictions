import type { Condition } from './types'

export function ConditionsList({ conditions }: { conditions: Condition[] }) {
  if (conditions.length === 0) return <p>No conditions recorded yet.</p>

  return (
    <table>
      <thead>
        <tr>
          <th>Recorded</th>
          <th>°C</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {conditions.map((c) => (
          <tr key={c.id}>
            <td>{new Date(c.recordedAt).toLocaleString()}</td>
            <td>{c.temperatureC}</td>
            <td>{c.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
