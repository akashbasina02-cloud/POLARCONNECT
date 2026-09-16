const steps = [
  ['Observe', 'Read the current station state and verify healthy systems.'],
  ['Simulate', 'Change population, weather, capacity, faults or resupply assumptions.'],
  ['Forecast', 'Project resource use and equipment capacity into the future.'],
  ['Explain', 'Show the first threshold crossing and likely cause.'],
  ['Visualize', 'Highlight the affected physical station zone in red.'],
  ['Decide', 'Compare response plans before the operator acts.'],
]

export default function Workflow() {
  return (
    <section className="section">
      <h2>How POLARCONNECT Works</h2>
      <div className="workflow">
        {steps.map(([title, text], i) => (
          <div className="step" key={title}>
            <span>{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
