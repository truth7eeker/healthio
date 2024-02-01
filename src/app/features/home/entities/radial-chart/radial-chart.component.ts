import { Component, ViewChild, input, effect } from '@angular/core'

import {
   ApexChart,
   ApexFill,
   ApexNonAxisChartSeries,
   ApexPlotOptions,
   NgApexchartsModule,
   ChartComponent,
} from 'ng-apexcharts'

@Component({
   selector: 'app-radial-chart',
   standalone: true,
   imports: [NgApexchartsModule],
   templateUrl: './radial-chart.component.html',
})
export class RadialChartComponent {
   @ViewChild('chart', { static: false }) chart: ChartComponent

   current = input<number>(0)
   desired = input<number>(0)
   metrics = input<string>('')
   color = input<string>('')

   public chartOptions: {
      series: ApexNonAxisChartSeries
      chart: ApexChart
      plotOptions: ApexPlotOptions
      fill: ApexFill
   }

   constructor() {
      this.initChart()

      effect(() => {
         this.updateChart()
      })
   }

   initChart() {
      this.chartOptions = {
         series: [],
         chart: {
            height: 150,
            width: 120,
            type: 'radialBar',
         },
         fill: {
            type: 'solid',
            colors: [],
         },
         plotOptions: {
            radialBar: {
               hollow: {
                  size: '70%',
               },
               track: {
                  background: '#737373',
               },
               dataLabels: {
                  name: {
                     show: false,
                  },
                  value: {
                     show: false,
                  },
               },
            },
         },
      }
   }

   updateChart() {
      const newSeries = (this.current() * 100) / this.desired()
      this.chartOptions.series = [newSeries]
      this.chartOptions.fill = {
         colors: [`#${this.color()}`],
      }
   }
}
