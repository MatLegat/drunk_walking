
class DistanceChart extends Chart {

  constructor(canvasId, stepList) {
    let ctx = document.getElementById(canvasId).getContext("2d")

    super(ctx, {
      type: 'line',

      data: {
        datasets: [{
          lineTension: 0,
          borderWidth: 2,
          borderColor: "#4F81BC",
          backgroundColor: "#4F81BC",
          fill: false,
          label: 'Distance',
          data: stepList.distanceData(),
          pointRadius: 0,
          hitRadius: 5
        }, {
          lineTension: 0.4,
          borderWidth: 2,
          borderColor: "#BD4A47",
          backgroundColor: "#BD4A47",
          fill: false,
          label: 'Estimated (\u221An)',
          data: stepList.estimatedDistanceData(),
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
              return 'Step ' + tooltipItems[0].xLabel;
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
