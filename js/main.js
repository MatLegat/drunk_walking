const pathCanvasId = "path-chart"
const distanceCanvasId = "distance-chart"
const histogramCanvasId = "histogram-chart"
const simulateButtonId = "simulate"
const stepsInputId = "steps"
const replicationsInputId = "replications"

window.onload = () => {
  const pathChart = new PathChart(pathCanvasId)
  const distanceChart = new DistanceChart(distanceCanvasId)
  const histogramChart = new HistogramChart(histogramCanvasId)

  document.getElementById(simulateButtonId).onclick = () => {
    const steps = document.getElementById(stepsInputId).value
    const replications = document.getElementById(replicationsInputId).value

    //TODO validate input

    let simulations = []

    for (let i = 0; i < replications; i++) {
      simulations.push(new Simulation(steps))
    }
    Object.freeze(simulations)

    if (replications == 1) {
      pathChart.updateData(simulations[0])
      distanceChart.updateData(simulations[0])
      histogramChart.hide()
    } else {
      pathChart.hide()
      distanceChart.hide()
      const hist = new Histogram(simulations)
      histogramChart.updateData(hist)
    }

  }

}
