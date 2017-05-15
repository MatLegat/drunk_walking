
class StateList {

  constructor() {
    this.list = [new State()]
    Object.freeze(this)
  }

  step() {
    this.list.push(this.last().nextState())
  }

  last() {
    return this.list.slice(-1)[0]
  }

  lock() {
    Object.freeze(this.list)
  }

  at(i) {
    return this.list[i]
  }

  pathData() {
    return this.list.map((state) => { return state.position() })
  }

  distanceData() {
    return this.list.map((state) => {
      return {x: state.step, y: state.distance}
    })
  }

  estimatedDistanceData() {
    return this.list.map((state) => {
       return {x: state.step, y: state.estimated}
    })
  }

}
