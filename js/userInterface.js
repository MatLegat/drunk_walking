
class UserInterface {
  constructor() {
    this.pathChart = new PathChart('path-chart')
    this.distanceChart = new DistanceChart('distance-chart')
    this.histogramChart = new HistogramChart('histogram-chart')
    this.outputWell = document.getElementById('output-well')
    this.progressBar = document.getElementById('progressbar')
    this.progressBarWell = this.progressBar.parentElement.parentElement
    this.simulateButton = document.getElementById('simulate')
    this.stepsInput = document.getElementById('steps')
    this.replicationsInput = document.getElementById('replications')
    this.distanceOutput = document.getElementById('final-distance')
    this.estimatedDistanceOutput = document.getElementById('final-est')
    this.diffOutput = document.getElementById('final-diff')
    
    this.addListeners()
  }
  
  // Update final state output
  updateFinalOut(lastState) {
    if (lastState == null) {
      this.outputWell.classList.add('well-hidden')
    } else {
      this.outputWell.classList.remove('well-hidden')
      this.distanceOutput.value = lastState.distance.toFixed(4)
      this.estimatedDistanceOutput.value = lastState.estimated.toFixed(4)
      this.diffOutput.value = lastState.diff.toFixed(4)
    }
  }
  
  // Update progress bar
  updateProgress(percent) {
    if (percent == null) {
      this.enableForm(true)
      this.progressBarWell.classList.add('well-hidden')
      this.enableForm(true)
    } else {
      this.progressBar.style.width = '' + percent + '%'
      this.progressBarWell.classList.remove('well-hidden')
      this.enableForm(false)
    }
  }
  
  // Enable/disable inputs and button
  enableForm(enable) {
    this.simulateButton.disabled = !enable
    this.simulateButton.blur()
    this.stepsInput.disabled = !enable
    this.replicationsInput.disabled = !enable
  }
  
  // Update charts
  updateCharts(simulations) {
    if (simulations.length == 1) {
      this.pathChart.updateData(simulations[0])
      this.distanceChart.updateData(simulations[0])
      this.updateFinalOut(simulations[0].lastState)
      this.histogramChart.hide()
    } else {
      this.pathChart.hide()
      this.distanceChart.hide()
      this.updateFinalOut(null)
      const histogram = new Histogram(simulations)
      this.histogramChart.updateData(histogram)
    }
  }

  // Get input values
  get input() {
    // Force validation
    this.stepsInput.dispatchEvent(new Event('change'))
    this.replicationsInput.dispatchEvent(new Event('change'))
    
    return {
      steps: parseInt(this.stepsInput.value),
      replications: parseInt(this.replicationsInput.value)
    }
  }
  
  // Validate input values
  validateInput(e) {
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
        document.getElementById('simulate').click()
      }
    }
  }
  
  addListeners() {
    // Focus on input when clicking on parent
    this.stepsInput.parentElement.onclick = () => {
      this.stepsInput.focus()
    }
    this.replicationsInput.parentElement.onclick = () => {
      this.replicationsInput.focus()
    }

    // Enable automatic validation
    this.stepsInput.onkeyup = this.validateInput
    this.stepsInput.onkeypress = this.validateInput
    this.stepsInput.onchange = this.validateInput
    this.replicationsInput.onkeyup = this.validateInput
    this.replicationsInput.onkeypress = this.validateInput
    this.replicationsInput.onchange = this.validateInput
  }

}
