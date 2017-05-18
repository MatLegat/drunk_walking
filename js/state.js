
class State {

  constructor(step = 0, x = 0, y = 0) {
    this.step = step
    this.x = x
    this.y = y

    // Make object immutable
    Object.freeze(this)
  }

  generateNextState() {
    const l = 1
    const rand = Math.random()
    const stepAngle = rand * 2 * Math.PI

    const step = this.step + 1
    const x = l * Math.cos(stepAngle) + this.x
    const y = l * Math.sin(stepAngle) + this.y

    return new State(step, x, y)
  }

  get distance() {
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
  }

  get estimated() {
    return Math.sqrt(this.step)
  }

  get position() {
    return {x: this.x, y: this.y}
  }

}
