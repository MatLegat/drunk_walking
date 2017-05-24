
class Histogram {

  constructor(simulations) {
    const nClasses = parseInt(Math.min(30, Math.sqrt(simulations.length)))
    const diffArray = simulations.map(
      (simulation) => simulation.diff
    ).sort((a, b) => a-b)

    const min = diffArray[0]
    const max = diffArray.slice(-1)[0]
    const diff = max - min
    const classSize = diff / nClasses

    this.classes = []
    let lastClassEnd = min
    for (let i = 0; i < nClasses; i++) {
      const max = lastClassEnd + classSize
      const min = lastClassEnd
      lastClassEnd = max

      const elements = diffArray.filter((diff) => {
          if (i == nClasses-1) {
            return diff >= min
          } else {
            return diff >= min && diff < max
          }
        }
      )
      const count = elements.length

      this.classes.push({min: min, max: max, count: count})
    }

    // Make object immutable
    Object.freeze(this)
    Object.freeze(this.classes)
  }

  get chartData() {
    return this.classes.map((range) => range.count)
  }

  get chartLabels() {
    return this.classes.map((range) => {
      return '' + range.min.toFixed(4) + ' - ' + range.max.toFixed(4)
    })
  }


}
