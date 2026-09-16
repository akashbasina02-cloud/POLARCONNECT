import { Router } from 'express'
import { stations } from '../data/stations.js'

const router = Router()

router.get('/', (req, res) => {
  res.json(Object.values(stations))
})

router.get('/:stationId', (req, res) => {
  const station = stations[req.params.stationId.toLowerCase()]

  if (!station) {
    return res.status(404).json({ error: 'Station not found' })
  }

  res.json(station)
})

export default router
