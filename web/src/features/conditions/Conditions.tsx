import { useEffect, useState } from 'react'
import { api } from '../../lib/api/client'
import { ConditionsList } from './ConditionsList'
import { RecordConditionForm } from './RecordConditionForm'
import type { Condition } from './types'

export function Conditions() {
  const [conditions, setConditions] = useState<Condition[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false

    async function load() {
      const { data, error: apiError } = await api.GET('/api/conditions')
      if (ignore) return
      if (apiError) setError('Failed to load conditions')
      else setConditions(data ?? [])
    }

    load()
    return () => {
      ignore = true
    }
  }, [reloadKey])

  if (error) return <p>Error: {error}</p>
  if (!conditions) return <p>Loading...</p>

  return (
    <>
      <RecordConditionForm onRecorded={() => setReloadKey((k) => k + 1)} />
      <ConditionsList conditions={conditions} />
    </>
  )
}
