const pathCanvasId = "path-chart"
const distanceCanvasId = "distance-chart"
const simulateButtonId = "simulate"
const stepsInputId = "steps"

window.onload = () => {
  const pathChart = new PathChart(pathCanvasId)
  const distanceChart = new DistanceChart(distanceCanvasId)

  document.getElementById(simulateButtonId).onclick = () => {
    const steps = document.getElementById(stepsInputId).value
    const replications = 1 //TODO create input

    //TODO validate input

    let simulations = []

    //TODO if for loop is too slow, make it recursive with setTimeout
    for (let i = 0; i < replications; i++) {
      simulations.push(new Simulation(steps))
    }

    Object.freeze(simulations)
    console.log(simulations)

    if (replications == 1) {
      pathChart.updateData(simulations[0])
      distanceChart.updateData(simulations[0])
      //TODO histogramChart.hide()
    } else {
      pathChart.hide()
      distanceChart.hide()
      //TODO histogramChart.updateData(...)
    }

  }

}
