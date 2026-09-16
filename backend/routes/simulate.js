import { Router } from 'express'
import { stations } from '../data/stations.js'
import { simulateScenario } from '../services/simulationService.js'

const router = Router()

router.post('/', (req, res) => {
  const stationId = String(req.body.stationId || 'maitri').toLowerCase()
  const station = stations[stationId]

  if (!station) {
    return res.status(400).json({
      error: 'Unknown stationId',
      allowed: Object.keys(stations)
    })
  }

  const result = simulateScenario(station, req.body)
  res.json(result)
})

export default router
