function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export function simulateScenario(station, input = {}) {
  const defaults = station.defaults

  const population = Number(input.population ?? defaults.population)
  const forecastDays = clamp(Number(input.forecastDays ?? 7), 1, 30)
  const outdoorTempC = Number(input.outdoorTempC ?? defaults.outdoorTempC)
  const waterProductionLitresPerDay = Number(
    input.waterProductionLitresPerDay ?? defaults.waterProductionLitresPerDay
  )
  const generationCapacityKw = Number(
    input.generationCapacityKw ?? defaults.generationCapacityKw
  )
  const daysUntilResupply = Number(
    input.daysUntilResupply ?? defaults.daysUntilResupply
  )

  const wornPipe = Boolean(input.wornPipe)
  const poorInsulation = Boolean(input.poorInsulation)
  const coldStoreFault = Boolean(input.coldStoreFault)

  // DEMO MODEL:
  // These calculations are intentionally simple and transparent for prototype use.
  const tempPenalty = Math.max(0, (-10 - outdoorTempC) * 1.5)
  const populationPowerDelta = Math.max(0, population - defaults.population) * 1.2
  const insulationPenalty = poorInsulation ? 28 : 0

  const projectedPowerDemandKw =
    defaults.basePowerDemandKw +
    tempPenalty +
    populationPowerDelta +
    insulationPenalty

  const waterDemandPerDay =
    population * defaults.waterUsePerPersonPerDay

  const waterLeakPerDay = wornPipe ? 900 : 0
  const netWaterPerDay =
    waterProductionLitresPerDay -
    waterDemandPerDay -
    waterLeakPerDay

  const projectedWaterLitres =
    defaults.waterReserveLitres + netWaterPerDay * forecastDays

  const fuelWeatherMultiplier =
    outdoorTempC < -25 ? 1.25 :
    outdoorTempC < -15 ? 1.12 : 1

  const projectedFuelUsePerDay =
    defaults.fuelUseLitresPerDay *
    fuelWeatherMultiplier *
    (poorInsulation ? 1.15 : 1)

  const projectedFuelLitres =
    defaults.fuelReserveLitres -
    projectedFuelUsePerDay * forecastDays

  const foodUseMeals =
    population * defaults.mealsPerPersonPerDay * forecastDays

  const projectedFoodMeals =
    defaults.foodMeals - foodUseMeals - (coldStoreFault ? forecastDays * 35 : 0)

  const waterReserveThreshold = defaults.waterReserveLitres * 0.2
  const fuelReserveThreshold = defaults.fuelReserveLitres * 0.2
  const foodReserveThreshold = defaults.foodMeals * 0.15

  const risks = []

  if (projectedPowerDemandKw > generationCapacityKw) {
    risks.push({
      system: 'power',
      severity: 'critical',
      title: 'Power demand exceeds capacity',
      detail: `${Math.round(projectedPowerDemandKw)} kW required > ${Math.round(generationCapacityKw)} kW available`,
      rootCause: poorInsulation
        ? 'Higher heating demand combined with poor insulation'
        : 'Electrical demand exceeds configured generation capacity',
      suggestedResponse: 'Restore generation capacity or reduce nonessential demand'
    })
  }

  if (projectedWaterLitres <= waterReserveThreshold) {
    risks.push({
      system: 'water',
      severity: projectedWaterLitres <= 0 ? 'critical' : 'warning',
      title: 'Water reserve risk',
      detail: `${Math.round(projectedWaterLitres)} L projected after ${forecastDays} day(s)`,
      rootCause: wornPipe
        ? 'Water demand plus simulated pipe leakage exceeds production'
        : 'Water demand exceeds available production over the forecast window',
      suggestedResponse: 'Restore production, repair leakage or conserve water'
    })
  }

  if (projectedFuelLitres <= fuelReserveThreshold) {
    risks.push({
      system: 'fuel',
      severity: projectedFuelLitres <= 0 ? 'critical' : 'warning',
      title: 'Fuel reserve risk',
      detail: `${Math.round(projectedFuelLitres)} L projected after ${forecastDays} day(s)`,
      rootCause: 'Heating/generation demand is consuming fuel faster than the reserve can support',
      suggestedResponse: 'Reduce nonessential load and verify resupply timing'
    })
  }

  if (projectedFoodMeals <= foodReserveThreshold) {
    risks.push({
      system: 'food',
      severity: projectedFoodMeals <= 0 ? 'critical' : 'warning',
      title: 'Food reserve risk',
      detail: `${Math.round(projectedFoodMeals)} meals projected after ${forecastDays} day(s)`,
      rootCause: coldStoreFault
        ? 'Consumption plus simulated cold-store losses reduce food endurance'
        : 'Population demand reduces food stock below the configured reserve',
      suggestedResponse: 'Review ration plan and resupply assumptions'
    })
  }

  const resourceEndurance = {
    waterDays:
      netWaterPerDay >= 0
        ? null
        : Math.max(0, defaults.waterReserveLitres / Math.abs(netWaterPerDay)),
    fuelDays:
      Math.max(0, defaults.fuelReserveLitres / projectedFuelUsePerDay),
    foodDays:
      Math.max(0, defaults.foodMeals / (population * defaults.mealsPerPersonPerDay))
  }

  return {
    station: {
      id: station.id,
      name: station.name
    },
    input: {
      population,
      forecastDays,
      outdoorTempC,
      waterProductionLitresPerDay,
      generationCapacityKw,
      daysUntilResupply,
      wornPipe,
      poorInsulation,
      coldStoreFault
    },
    forecast: {
      projectedPowerDemandKw: Math.round(projectedPowerDemandKw * 10) / 10,
      projectedWaterLitres: Math.round(projectedWaterLitres),
      projectedFuelLitres: Math.round(projectedFuelLitres),
      projectedFoodMeals: Math.round(projectedFoodMeals),
      resourceEnduranceDays: {
        water: resourceEndurance.waterDays === null
          ? 'stable/increasing'
          : Math.round(resourceEndurance.waterDays * 10) / 10,
        fuel: Math.round(resourceEndurance.fuelDays * 10) / 10,
        food: Math.round(resourceEndurance.foodDays * 10) / 10
      },
      resupplyGapRisk:
        risks.length > 0 && forecastDays < daysUntilResupply
    },
    risks,
    riskCount: risks.length,
    status: risks.length === 0 ? 'healthy' : 'attention_required',
    disclaimer:
      'Prototype simulation only. Real deployment should use live sensors, live/latest weather, validated engineering thresholds and rolling forecasts with confidence ranges.'
  }
}
