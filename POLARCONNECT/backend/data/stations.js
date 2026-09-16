export const stations = {
  maitri: {
    id: 'maitri',
    name: 'Maitri Research Station',
    defaults: {
      population: 24,
      outdoorTempC: -18,
      waterReserveLitres: 12000,
      waterProductionLitresPerDay: 5000,
      waterUsePerPersonPerDay: 120,
      fuelReserveLitres: 18000,
      fuelUseLitresPerDay: 900,
      generationCapacityKw: 260,
      basePowerDemandKw: 210,
      foodMeals: 4200,
      mealsPerPersonPerDay: 3,
      daysUntilResupply: 14
    }
  },

  bharati: {
    id: 'bharati',
    name: 'Bharati Research Station',
    defaults: {
      population: 32,
      outdoorTempC: -20,
      waterReserveLitres: 16000,
      waterProductionLitresPerDay: 6500,
      waterUsePerPersonPerDay: 120,
      fuelReserveLitres: 22000,
      fuelUseLitresPerDay: 1100,
      generationCapacityKw: 320,
      basePowerDemandKw: 255,
      foodMeals: 5600,
      mealsPerPersonPerDay: 3,
      daysUntilResupply: 18
    }
  }
}
