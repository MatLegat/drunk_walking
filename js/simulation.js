
class Simulation {

  constructor(steps) {
    this.stateList = [new State()]

    for (let i = 0; i < steps; i++) {
      this.stateList.push(this.lastState.generateNextState())
    }

    // Make object immutable
    Object.freeze(this)
    Object.freeze(this.stateList)
  }

  get lastState() {
    return this.stateList.slice(-1)[0]
  }

  get distance() {
    return this.lastState.distance
  }

  get estimated() {
    return this.lastState.estimated
  }

  get diff() {
    return Math.abs(this.distance - this.estimated)
  }

  get pathData() {
    return this.stateList.map((state) => state.position)
  }

  get distanceData() {
    return this.stateList.map((state) => ({x: state.step, y: state.distance}))
  }

  get estimatedDistanceData() {
    return this.stateList.map((state) => ({x: state.step, y: state.estimated}))
  }


}
