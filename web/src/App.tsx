import { Conditions } from './features/conditions/Conditions'
import { Forecasts } from './features/forecasts/Forecasts'

function App() {
  return (
    <main>
      <section>
        <h1>Forecasts</h1>
        <Forecasts />
      </section>
      <section >
        <h1>Current conditions</h1>
        <Conditions />
      </section>
    </main>
  )
}

export default App
