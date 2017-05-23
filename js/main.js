const pathCanvasId = "path-chart"
const distanceCanvasId = "distance-chart"
const histogramCanvasId = "histogram-chart"
const simulateButtonId = "simulate"
const stepsInputId = "steps"
const replicationsInputId = "replications"
const progressBarId = "progressbar"
const distanceOutputId = "final-distance"
const estimatedDistanceOutputId = "final-est"
const diffOutputId = "final-diff"
const outputWellId = "output-well"

window.onload = () => {
  const pathChart = new PathChart(pathCanvasId)
  const distanceChart = new DistanceChart(distanceCanvasId)
  const histogramChart = new HistogramChart(histogramCanvasId)

  // Update final state output
  const updateFinalOut = (lastState) => {
    const outWell = document.getElementById(outputWellId)
    if (lastState == null) {
      outWell.classList.add('well-hidden')
    } else {
      outWell.classList.remove('well-hidden')
      const distance = document.getElementById(distanceOutputId)
      const estimated = document.getElementById(estimatedDistanceOutputId)
      const diff = document.getElementById(diffOutputId)
      distance.value = lastState.distance.toFixed(3)
      estimated.value = lastState.estimated.toFixed(3)
      diff.value = lastState.diff.toFixed(3)
    }
  }

  // Update progress bar
  const updateProgress = (percent) => {
    const bar = document.getElementById(progressBarId)
    const barWell = bar.parentElement.parentElement
    if (percent == null) {
      barWell.classList.add('well-hidden')
    } else {
      bar.style.width = '' + percent + '%'
      barWell.classList.remove('well-hidden')
    }
  }

  // Enable/disable inputs and button
  const enableForm = (enable) => {
    document.getElementById(simulateButtonId).disabled = !enable
    document.getElementById(stepsInputId).disabled = !enable
    document.getElementById(replicationsInputId).disabled = !enable
  }

  // Update charts
  const updateCharts = (simulations) => {
    if (simulations.length == 1) {
      pathChart.updateData(simulations[0])
      distanceChart.updateData(simulations[0])
      updateFinalOut(simulations[0].lastState)
      histogramChart.hide()
    } else {
      pathChart.hide()
      distanceChart.hide()
      updateFinalOut(null)
      const histogram = new Histogram(simulations)
      histogramChart.updateData(histogram)
    }
  }

  // Run simulation when click on "simulate" button
  document.getElementById(simulateButtonId).onclick = (click) => {
    const stepsInput = document.getElementById(stepsInputId)
    const replicationsInput = document.getElementById(replicationsInputId)

    // Force validation
    stepsInput.dispatchEvent(new Event('change'))
    replicationsInput.dispatchEvent(new Event('change'))

    // Get input values
    const steps = parseInt(document.getElementById(stepsInputId).value)
    const replications = parseInt(document.getElementById(replicationsInputId).value)

    // Disable button and inputs
    enableForm(false)

    let simulations = []
    const showPath = replications == 1
    let i = 0;
    const chunkSize = 10

    // Simulates replications in async chunks, so the browser won't freeze
    const replicateChunk = () => {
      for (i = i; i < replications; i++) {
        simulations.push(new Simulation(steps, showPath))
        if (i % chunkSize == 0) {  // Chunk ended
          i++
          break
        }
      }
      updateProgress(i/replications*100)
      if (i < replications) {  // There are still chunks left
        setTimeout(replicateChunk, 0)
      }
      else {  // No more chunks left
        Object.freeze(simulations)
        updateCharts(simulations)

        // Hide progress bar
        updateProgress()

        // Enable button and inputs
        enableForm(true)
        click.target.blur()
      }
    }

    replicateChunk()

  }

  // Focus on input when clicking on parent
  document.getElementById(stepsInputId).parentElement.onclick = () => {
    document.getElementById(stepsInputId).focus()
  }
  document.getElementById(replicationsInputId).parentElement.onclick = () => {
    document.getElementById(replicationsInputId).focus()
  }

  const validate = (e) => {
    if (e) {
      // Validate input
      let input = e.target
      if (input.value.match(/^[0-9]+$/) == null && input.value != '') {
        input.value = input.value.replace(/\D/g,'')
      }
      if (e.type == 'change' && input.value == '') {
        input.value = 0
      }
      if (parseInt(input.value) < parseInt(input.min)) {
        input.value = input.min
      } else if (parseInt(input.value) > parseInt(input.max)) {
        input.value = input.max
      }
      // Run when enter is pressed
      if (e.keyCode == 13 && e.type == 'keyup') {
        document.getElementById(simulateButtonId).click()
      }
    }
  }

  document.getElementById(stepsInputId).onkeyup = validate
  document.getElementById(stepsInputId).onkeypress = validate
  document.getElementById(stepsInputId).onchange = validate
  document.getElementById(replicationsInputId).onkeyup = validate
  document.getElementById(replicationsInputId).onkeypress = validate
  document.getElementById(replicationsInputId).onchange = validate

}
