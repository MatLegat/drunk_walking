
class HistogramChart extends Chart {

  constructor(canvasId) {
    const ctx = document.getElementById(canvasId)

    super(ctx, {
      type: 'bar',
      options: {
        tooltips: {
          callbacks: {
            label: (tooltipItems) => (tooltipItems.yLabel),
            title: (tooltipItems) => (tooltipItems[0].xLabel)
          }
        },
        legend: {
          onClick: null
        },
        scales: {
        	yAxes:[{
        		stacked:true,
            gridLines: {
            	display:true,
              color:"rgba(255,99,132,0.2)"
            }
          }],
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Final difference (range)'
            },
            categoryPercentage: 1.0,
            barPercentage: 1.0,
        		gridLines: {
            	display:false
            }
          }]
        }
      }
    })

    this.hide = () => {
      ctx.parentElement.classList.add('well-hidden')
    }

    this.updateData = (histogram) => {
      this.config.data = {
        labels: histogram.chartLabels,
        datasets: [{
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          label: 'Occurrences',
          data: histogram.chartData
        }]
      }

      this.update()
      ctx.parentElement.classList.remove('well-hidden')

    }
  }

}
