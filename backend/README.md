# POLARCONNECT Backend

Small Node.js/Express backend for the POLARCONNECT PS-60 prototype.

## Features

- Maitri and Bharati station profiles
- health check
- station data API
- scenario simulation API
- basic resource/risk forecasting
- prototype root-cause explanations
- in-memory maintenance log

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Default backend URL:

```text
http://localhost:5000
```

## API Endpoints

### Health

```http
GET /api/health
```

### Stations

```http
GET /api/stations
GET /api/stations/maitri
GET /api/stations/bharati
```

### Simulation

```http
POST /api/simulate
Content-Type: application/json
```

Example body:

```json
{
  "stationId": "maitri",
  "population": 30,
  "forecastDays": 7,
  "outdoorTempC": -28,
  "waterProductionLitresPerDay": 3000,
  "generationCapacityKw": 230,
  "daysUntilResupply": 14,
  "wornPipe": true,
  "poorInsulation": true,
  "coldStoreFault": false
}
```

The response includes:

- projected power demand
- projected water reserve
- projected fuel reserve
- projected food stock
- resource endurance
- detected risks
- root-cause explanation
- suggested response

### Maintenance Log

```http
GET /api/maintenance
POST /api/maintenance
```

Example POST body:

```json
{
  "system": "water",
  "action": "Inspected pipe W-01",
  "notes": "Leak isolated during simulation",
  "status": "completed"
}
```

## Important

The included forecasting formulas are **prototype/demo logic**, not validated engineering models.

A real deployment should integrate:
- live sensors
- BMCS/BMS/PLC data
- latest weather input
- validated station thresholds
- historical time-series storage
- confidence-aware predictive models
- rolling re-forecasting
- authenticated operator actions
