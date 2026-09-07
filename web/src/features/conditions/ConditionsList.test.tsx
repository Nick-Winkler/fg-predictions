import { render, screen } from '@testing-library/react'
import { ConditionsList } from './ConditionsList'
import type { Condition } from './types'

describe('ConditionsList', () => {
  it('shows an empty state when there are no conditions', () => {
    render(<ConditionsList conditions={[]} />)

    expect(screen.getByText('No conditions recorded yet.')).toBeInTheDocument()
  })

  it('renders a row per condition', () => {
    const conditions: Condition[] = [
      { id: 1, recordedAt: '2026-01-01T12:00:00Z', temperatureC: 20, summary: 'Mild' },
      { id: 2, recordedAt: '2026-01-02T12:00:00Z', temperatureC: -5, summary: 'Chilly' },
    ]

    render(<ConditionsList conditions={conditions} />)

    expect(screen.getByText('Mild')).toBeInTheDocument()
    expect(screen.getByText('Chilly')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(3) // header + two data rows
  })
})
