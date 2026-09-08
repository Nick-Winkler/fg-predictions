import { render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '../../test/server'
import { Conditions } from './Conditions'
import type { Condition } from './types'

describe('Conditions', () => {
  it('shows a loading state, then renders the fetched conditions', async () => {
    server.use(
      http.get('*/api/conditions', () =>
        HttpResponse.json([
          { id: 1, recordedAt: '2026-01-01T12:00:00Z', temperatureC: 20, summary: 'Mild' },
        ] satisfies Condition[]),
      ),
    )

    render(<Conditions />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(await screen.findByText('Mild')).toBeInTheDocument()
  })

  it('shows an error message when the fetch fails', async () => {
    server.use(
      http.get('*/api/conditions', () =>
        HttpResponse.json({ title: 'Server error' }, { status: 500 }),
      ),
    )

    render(<Conditions />)

    expect(await screen.findByText('Error: Failed to load conditions')).toBeInTheDocument()
  })
})
