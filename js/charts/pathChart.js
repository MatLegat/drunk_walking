
class PathChart extends Chart {

  constructor(canvasId) {
    const ctx = document.getElementById(canvasId)

    super(ctx, {
      type: 'line',
      options: {
        tooltips: {
          position: 'nearest',
          bodyFontStyle: 'bold',
          displayColors: false,
          callbacks: {
            label: (tooltipItems) => ('y: ' + tooltipItems.yLabel.toFixed(3)),
            title: (tooltipItems) => ('x: ' + tooltipItems[0].xLabel.toFixed(3))
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
          borderColor: "#FFC000",
          backgroundColor: "#FFC000",
          pointBorderColor: "#64c2d6",
          pointBackgroundColor: "#4F81BC",
          pointBorderWidth: 1,
          fill: false,
          label: 'Path',
          data: simulation.pathData
        }]
      }

      this.update()
      ctx.parentElement.classList.remove('well-hidden')

    }
  }

}
