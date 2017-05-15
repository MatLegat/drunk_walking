
class PathChart extends Chart {

  constructor(canvasId, stepList) {
    let ctx = document.getElementById(canvasId).getContext("2d")
    
    super(ctx, {
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
          label: 'Path',
          data: stepList.pathData()
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
    })
  }

}
