
class DistanceChart extends Chart {

  constructor(canvasId) {
    const ctx = document.getElementById(canvasId)

    super(ctx, {
      type: 'line',
      options: {
        tooltips: {
          mode: 'index',
          position: 'nearest',
          callbacks: {
            label: (tooltipItems) => (' ' + tooltipItems.yLabel.toFixed(3)),
            title: (tooltipItems) => ('Step ' + tooltipItems[0].xLabel)
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

    this.hide = () => {
      ctx.parentElement.classList.add('well-hidden')
    }

    this.updateData = (simulation) => {
      this.config.data = {
        datasets: [{
          lineTension: 0,
          borderWidth: 2,
          borderColor: "#4F81BC",
          backgroundColor: "#4F81BC",
          fill: false,
          label: 'Distance',
          data: simulation.distanceData,
          pointRadius: 0,
          hitRadius: 5
        }, {
          lineTension: 0.4,
          borderWidth: 2,
          borderColor: "#BD4A47",
          backgroundColor: "#BD4A47",
          fill: false,
          label: 'Estimated (\u221An)',
          data: simulation.estimatedDistanceData,
          pointRadius: 0,
          hitRadius: 5
        }]
      }

      this.update()
      ctx.parentElement.classList.remove('well-hidden')

    }
  }

}
