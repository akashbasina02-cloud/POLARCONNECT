import SystemCard from './components/SystemCard.jsx'
import Workflow from './components/Workflow.jsx'

const systems = [
  ['Power', 'Electrical demand, generation and equipment capacity'],
  ['Heating', 'Indoor temperature and heating demand'],
  ['Ventilation', 'Airflow and ventilation equipment status'],
  ['Fuel', 'Fuel reserve and consumption forecast'],
  ['Water', 'Storage, production, consumption and leakage'],
  ['Air Quality', 'Indoor environmental monitoring'],
  ['Fire Safety', 'Alarm and fire-system status'],
  ['Weather', 'Outdoor temperature and station conditions'],
  ['Equipment Health', 'Faults and predictive maintenance indicators'],
  ['Food Storage', 'Food reserve and cold-store temperature'],
]

export default function App() {
  return (
    <>
      <header>
        <div>
          <strong>POLARCONNECT</strong>
          <span>PS-60</span>
        </div>
        <p>Antarctic Research Station Remote Management</p>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">OBSERVE · FORECAST · DECIDE</p>
            <h1>POLARCONNECT</h1>
            <h2>More research time through smarter station operations.</h2>
            <p>
              Integrated monitoring, future simulation, early fault prediction,
              root-cause analysis, smart alerts, maintenance priority and
              3D decision support for Antarctic research stations.
            </p>
          </div>
          <img src="/images/polarconnect-cover.png" alt="POLARCONNECT project visual" />
        </section>

        <section className="section">
          <h2>Main Objective</h2>
          <p className="lead">
            Reduce avoidable monitoring and maintenance workload so scientists
            can spend more time on research while operators receive earlier,
            clearer information about developing system problems.
          </p>
        </section>

        <section className="section">
          <h2>Systems Monitored</h2>
          <div className="cards">
            {systems.map(([title, text]) => (
              <SystemCard key={title} title={title} text={text} />
            ))}
          </div>
        </section>

        <Workflow />

        <section className="section panel">
          <h2>Prediction Flow</h2>
          <p className="flow">
            Sensors & Weather → Station Model → Future Simulation →
            Threshold Crossing → Root Cause → 3D Red Zone →
            Plan Comparison → Human Decision
          </p>
          <p>
            In a real deployment the forecast should update continuously from
            changing sensor and weather inputs and display confidence/ranges
            instead of presenting one fixed future as certain.
          </p>
        </section>

        <section className="section panel">
          <h2>Prototype Screenshots</h2>
          <p>
            All real prototype screens are stored in the
            <strong> screenshots/ </strong> folder of this repository.
            See <strong>docs/IMAGE_DETAILS.md</strong> for the screenshot index.
          </p>
        </section>
      </main>

      <footer>
        POLARCONNECT — PS-60 · Antarctic Station Monitoring & Predictive Decision Support
      </footer>
    </>
  )
}
