import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import stationsRouter from './routes/stations.js'
import simulateRouter from './routes/simulate.js'
import maintenanceRouter from './routes/maintenance.js'

const app = express()

const PORT = Number(process.env.PORT || 5000)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

app.use(cors({
  origin: FRONTEND_ORIGIN
}))

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'POLARCONNECT backend',
    timestamp: new Date().toISOString()
  })
})

app.use('/api/stations', stationsRouter)
app.use('/api/simulate', simulateRouter)
app.use('/api/maintenance', maintenanceRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`POLARCONNECT backend running on http://localhost:${PORT}`)
})
