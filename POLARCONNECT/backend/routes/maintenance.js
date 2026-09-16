import { Router } from 'express'
import {
  getMaintenanceLog,
  addMaintenanceEntry
} from '../services/maintenanceStore.js'

const router = Router()

router.get('/', (req, res) => {
  res.json(getMaintenanceLog())
})

router.post('/', (req, res) => {
  const item = addMaintenanceEntry(req.body || {})
  res.status(201).json(item)
})

export default router
