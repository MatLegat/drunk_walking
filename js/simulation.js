
class Simulation {

  constructor(steps) {
    this.stateList = new StateList()

    for (let i = 0; i < steps; i++) {
      this.stateList.step()
    }
    this.stateList.lock()

    const finalState = this.stateList.last()
    this.distance = finalState.distance
    this.estimated = finalState.estimated
    this.diff = Math.abs(this.distance - this.estimated)

    // Make object immutable
    Object.freeze(this)
  }

}
