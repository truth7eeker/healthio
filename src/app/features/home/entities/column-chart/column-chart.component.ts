import { Component, ViewChild, input, effect } from '@angular/core'
import {
   ApexAxisChartSeries,
   ApexChart,
   ChartComponent,
   ApexDataLabels,
   ApexPlotOptions,
   ApexYAxis,
   ApexLegend,
   ApexXAxis,
   ApexFill,
   ApexTooltip,
   NgApexchartsModule,
   ApexTitleSubtitle,
} from 'ng-apexcharts'

import { goalDescription } from 'src/app/core/data/default-data'

export type ChartOptions = {
   series: ApexAxisChartSeries
   chart: ApexChart
   dataLabels: ApexDataLabels
   plotOptions: ApexPlotOptions
   yaxis: ApexYAxis
   xaxis: ApexXAxis
   fill: ApexFill
   tooltip: ApexTooltip
   legend: ApexLegend
   title: ApexTitleSubtitle
}

@Component({
   selector: 'app-column-chart',
   standalone: true,
   imports: [NgApexchartsModule],
   templateUrl: './column-chart.component.html',
})
export class ColumnChartComponent {
   @ViewChild('columnChart', { static: false }) columnChart: ChartComponent
   public chartOptions: Partial<ChartOptions>

   labels = input<string[]>([])
   category = input<string>('water')
   nums = input<number[]>([])
   yaxisText = input<string | any>('')

   constructor() {
      this.initChart()

      effect(() => {
         this.updateChart()
      })
   }

   initChart() {
      this.chartOptions = {
         chart: {
            type: 'bar',
            height: 370,
         },
         plotOptions: {
            bar: {
               horizontal: false,
               columnWidth: '55%',
               borderRadius: 7,
               borderRadiusApplication: 'end',
            },
         },
         dataLabels: {
            enabled: false,
         },
         xaxis: {
            categories: [],
            labels: {
               style: {
                  colors: '#FFF',
                  fontWeight: '500',
               },
               rotate: 0,
            },
         },
         yaxis: {
            title: {
               text: '',
               style: {
                  color: '#FFFFFF',
               },
            },
            labels: {
               style: {
                  colors: '#FFFFFF',
               },
            },
         },
         tooltip: {
            theme: 'dark',
         },
         title: {
            text: 'Two weeks progress',
            align: 'right',
            offsetX: -30,
            style: {
               color: '#CCC',
            },
         },
      }
   }

   updateChart() {
      const newSeries = [
         {
            name: this.category(),
            data: this.nums(),
         },
      ]

      const newXaxis = {
         ...this.chartOptions.xaxis,
         categories: this.labels(),
         labels: {
            ...this.chartOptions.xaxis.labels,
            formatter(value) {
               const split = typeof value === 'string' && value.split(' ')
               return [split[0], split[1]]
            },
         },
      }

      const newYaxis = {
         ...this.chartOptions.yaxis,
         title: {
            ...this.chartOptions.yaxis.title,
            text: this.yaxisText(),
         },
      }

      const newTooltip = {
         ...this.chartOptions.tooltip,
         y: {
            formatter: (val) => {
               return `${val} ${this.yaxisText()}`
            },
         },
      }

      const newFill = {
         colors: ['#' + goalDescription[this.category()].color],
      }

      this.chartOptions = {
         ...this.chartOptions,
         series: [...newSeries],
         xaxis: { ...newXaxis },
         yaxis: { ...newYaxis },
         tooltip: { ...newTooltip },
         fill: { ...newFill },
      }
   }
}
