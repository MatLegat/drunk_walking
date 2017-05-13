
function randAngle() {
  var rand = Math.random()
  return rand * 2 * Math.PI
}

function generateStep(lastStep) {
  var l = 1
  var angle = randAngle()
  var x = l * Math.cos(angle) + lastStep.position.x
  var y = l * Math.sin(angle) + lastStep.position.y
  var d = Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
  var i = lastStep.step + 1
  return {position: {x: x, y: y}, distance: d, step: i}
}

function drawCanvas(stepList) {
  var path_ctx = document.getElementById("path-chart")
  var distance_ctx = document.getElementById("distance-chart")
  var pathData = stepList.map((step) => { return step.position })
  var distanceData = stepList.map((step) => { return {x: step.step, y: step.distance} })
  console.log(distanceData);

  var pathChart = new Chart(path_ctx, {
      type: 'line',
      data: {
        datasets: [{
          lineTension: 0,
          borderWidth: 2,
          borderColor: "rgba(75,192,192,1)",
          fill: false,
          label: 'Caminho',
          data: pathData
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
  });
  var distanceChart = new Chart(distance_ctx, {
      type: 'line',
      data: {

        datasets: [{
          lineTension: 0,
          borderWidth: 2,
          borderColor: "rgba(75,192,192,1)",
          fill: false,
          label: 'Distancia',
          data: distanceData
        }]
      },
      options: {
        scales: {
          yAxes: [{
            display: true
          }]
        }
      }
  });
}

function simulate(steps) {
  var stepList = []
  stepList.push({position: {x: 0, y: 0}, distance: 0, step: 0})

  for (var i = 0; i < steps; i++) {
    var lastStep = stepList.slice(-1)[0]
    stepList.push(generateStep(lastStep))
  }

  drawCanvas(stepList)

}
