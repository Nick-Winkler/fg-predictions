import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

// Default "happy path" handlers. Individual tests override these with server.use(...).
export const handlers = [
  http.post('*/api/conditions', () =>
    HttpResponse.json(
      { id: 1, recordedAt: new Date().toISOString(), temperatureC: 21, summary: 'Mild' },
      { status: 201 },
    ),
  ),
]

export const server = setupServer(...handlers)
