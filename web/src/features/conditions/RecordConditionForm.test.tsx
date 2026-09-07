import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../../test/server'
import { RecordConditionForm } from './RecordConditionForm'

describe('RecordConditionForm', () => {
  it('posts the condition and notifies the parent on success', async () => {
    const user = userEvent.setup()
    const onRecorded = vi.fn()
    render(<RecordConditionForm onRecorded={onRecorded} />)

    await user.type(screen.getByPlaceholderText('Temperature (°C)'), '21')
    await user.type(screen.getByPlaceholderText('Summary'), 'Mild')
    await user.click(screen.getByRole('button', { name: 'Record' }))

    await waitFor(() => expect(onRecorded).toHaveBeenCalledOnce())
    expect(screen.queryByText('Failed to record condition')).not.toBeInTheDocument()
  })

  it('shows an error and does not notify the parent when the request fails', async () => {
    server.use(
      http.post('*/api/conditions', () =>
        HttpResponse.json({ title: 'Server error' }, { status: 500 }),
      ),
    )

    const user = userEvent.setup()
    const onRecorded = vi.fn()
    render(<RecordConditionForm onRecorded={onRecorded} />)

    await user.type(screen.getByPlaceholderText('Temperature (°C)'), '21')
    await user.click(screen.getByRole('button', { name: 'Record' }))

    expect(await screen.findByText('Failed to record condition')).toBeInTheDocument()
    expect(onRecorded).not.toHaveBeenCalled()
  })
})
