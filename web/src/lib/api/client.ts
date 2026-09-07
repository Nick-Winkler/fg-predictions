import createClient from 'openapi-fetch'
import type { paths } from './schema'

// Default to relative path unless base url is set (e.g. vite tests)
export const api = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
})
