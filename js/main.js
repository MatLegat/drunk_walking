const pathCanvasId = "path-chart"
const distanceCanvasId = "distance-chart"
let pathChart = null
let distanceChart = null
let simulations = null

function drawCharts(stepList) {
  if (pathChart) { pathChart.destroy() }
  pathChart = new PathChart(pathCanvasId, stepList)

  if (distanceChart) { distanceChart.destroy() }
  distanceChart = new DistanceChart(distanceCanvasId, stepList)
}

function simulate(steps, replications = 1) {
  /*
   * TODO
   * validate input
   * multiple replications
   * histogram
  */

  simulations = []

  for (let i = 0; i < replications; i++) {
    simulations.push(new Simulation(steps))
  }

  Object.freeze(simulations)
  console.log(simulations)

  if (replications == 1) {
    drawCharts(simulations[0].stateList)
  }
}
