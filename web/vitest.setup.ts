import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach } from 'vitest'
import { server } from './src/test/server'

// Start MSW at top level (before test files import the api client) so it patches
// global fetch before openapi-fetch captures it at createClient() time.
server.listen({ onUnhandledRequest: 'error' })

afterEach(() => server.resetHandlers())
afterAll(() => server.close())
