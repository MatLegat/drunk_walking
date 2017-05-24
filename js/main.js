
window.onload = () => {
  const gui = new UserInterface()

  // Run simulation when click on "simulate" button
  document.getElementById('simulate').onclick = (click) => {
    
    // Get input
    const steps = gui.input.steps
    const replications = gui.input.replications
  
    let simulations = []
    let i = 0;
    const showPath = replications == 1
    const chunkSize = 10
  
    // Simulates replications in async chunks, so the browser won't freeze
    function replicateChunk() {
      while (i < replications) {
        i++
        simulations.push(new Simulation(steps, showPath))
        if (i % chunkSize == 0) {  // Chunk ended
          break
        }
      }
      
      if (i < replications) {  // There are still chunks left
        gui.updateProgress(i/replications*100)
        setTimeout(replicateChunk, 0)
      }
      
      else {  // No more chunks left
        Object.freeze(simulations)
        gui.updateCharts(simulations)
        // Hide progress bar
        gui.updateProgress(null)
      }
    }
  
    replicateChunk()
  
  }

}
