
function randAngle() {
  const rand = Math.random()
  return rand * 2 * Math.PI
}

class State {

  constructor(step = 0, x = 0, y = 0) {
    this.step = step
    this.x = x
    this.y = y
    this.distance = Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
    this.estimated = Math.sqrt(step)

    // Make object immutable
    Object.freeze(this)
  }

  nextState() {
    const l = 1
    const stepAngle = randAngle()

    const step = this.step + 1
    const x = l * Math.cos(stepAngle) + this.x
    const y = l * Math.sin(stepAngle) + this.y

    return new State(step, x, y)
  }

  position() {
    return {x: this.x, y: this.y}
  }

}
