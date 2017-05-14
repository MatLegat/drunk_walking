
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
  var e = Math.sqrt(i)
  return {position: {x: x, y: y}, distance: d, step: i, estimated: e}
}

function drawCanvas(stepList) {
  var path_ctx = document.getElementById("path-chart")
  var distance_ctx = document.getElementById("distance-chart")
  var pathData = stepList.map((step) => { return step.position })
  var distanceData = stepList.map((step) => { return {x: step.step, y: step.distance} })
  var estimatedDistanceData = stepList.map((step) => { return {x: step.step, y: step.estimated} })
  console.log(distanceData);

  var pathChart = new Chart(path_ctx, {
      type: 'line',
      data: {
        datasets: [{
          lineTension: 0,
          borderWidth: 2,
          borderColor: "#FFC000",
          backgroundColor: "#FFC000",
          pointBorderColor: "#64c2d6",
          pointBackgroundColor: "#4F81BC",
          pointBorderWidth: 1,
          fill: false,
          label: 'Caminho',
          data: pathData
        }]
      },
      options: {
        tooltips: {
          position: 'nearest',
          bodyFontStyle: 'bold',
          displayColors: false,
          callbacks: {
            label: (tooltipItems) => {
              return 'y: ' + tooltipItems.yLabel.toFixed(3);
            },
            title: (tooltipItems) => {
              return 'x: ' + tooltipItems[0].xLabel.toFixed(3);
            }
          }
        },
        legend: {
          onClick: null
        },
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
          borderColor: "#4F81BC",
          backgroundColor: "#4F81BC",
          fill: false,
          label: 'Distancia',
          data: distanceData,
          pointRadius: 0,
          hitRadius: 5
        }, {
          lineTension: 0.4,
          borderWidth: 2,
          borderColor: "#BD4A47",
          backgroundColor: "#BD4A47",
          fill: false,
          label: 'Estimado (\u221An)',
          data: estimatedDistanceData,
          pointRadius: 0,
          hitRadius: 5
        }]
      },
      options: {
        tooltips: {
          mode: 'index',
          position: 'nearest',
          callbacks: {
            label: (tooltipItems) => {
              return ' ' + tooltipItems.yLabel.toFixed(3);
            },
            title: (tooltipItems) => {
              return 'Passo ' + tooltipItems[0].xLabel;
            }
          }
        },
        legend: {
          onClick: null
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
  });
}

function simulate(steps) {
  var stepList = []
  stepList.push({position: {x: 0, y: 0}, distance: 0, step: 0, estimated: 0})

  for (var i = 0; i < steps; i++) {
    var lastStep = stepList.slice(-1)[0]
    stepList.push(generateStep(lastStep))
  }

  drawCanvas(stepList)

}
