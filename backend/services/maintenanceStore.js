const maintenanceLog = []

export function getMaintenanceLog() {
  return maintenanceLog
}

export function addMaintenanceEntry(entry) {
  const item = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    system: entry.system || 'general',
    action: entry.action || 'Inspection',
    notes: entry.notes || '',
    status: entry.status || 'completed'
  }

  maintenanceLog.unshift(item)
  return item
}
