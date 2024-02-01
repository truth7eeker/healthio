import { Injectable, inject, signal } from '@angular/core'

import { findStartEndTimestamps } from './utils/dates.utils'
import { RestService } from './rest/rest.service'
import { stats } from '../../data/default-data'
import { IGoalsStats, IStat } from '../../models/stats.model'
import { getLocalStorage } from 'src/app/shared/utils/local-storage.utils'

import { SpinnerVisibilityService } from 'ng-http-loader';


@Injectable({
   providedIn: 'root',
})
export class StatsService {
   private restService: RestService = inject(RestService)
   private spinner: SpinnerVisibilityService = inject(SpinnerVisibilityService)

   goalsStats = signal<IGoalsStats | []>([])
   emotionsStats = signal<any>([])

   category = signal<string>('water')
   chartText = signal<string>('glass')
   period = signal<number>(14)

   goalsNums = signal<number[] | []>([])
   dates = signal<string[] | []>([])

   progress = signal<number>(0)
   totalNum = signal<number>(0)
   totalProgress = signal({})
   happyDays = signal<number>(0)

   constructor() {}

   getData() {
      this.spinner.show()

      const { startTimestamp, endTimestamp } = findStartEndTimestamps(
         this.period()
      )

      return this.restService
         .getPeriodData({ startTimestamp, endTimestamp })
         .subscribe((newState) => {
            this.goalsStats.set(newState.newGoals)
            this.updateGoalsData()
            this.happyDays.set(newState.newEmotions.length)
            this.spinner.hide()
         })
   }

   setCategory(category: string, metrics: string) {
      this.category.set(category)
      this.chartText.set(metrics)

      this.updateGoalsData()
      this.updateCurrProgress()
   }

   updateGoalsData() {
      const nums = this.goalsStats()[this.category()].map(
         (item: IStat) => item.current
      )
      const dates = this.goalsStats()[this.category()].map(
         (item: IStat) => item.date
      )
      this.goalsNums.set(nums)
      this.dates.set(dates)
      this.calcTotalGoalsProgress()
   }

   calcTotalGoalsProgress() {
      const result = {}

      Object.keys(stats).forEach((key) => {
         const expectedDaily = getLocalStorage([`${key}`])
         const expectedTotal = this.period() * +expectedDaily[key]
         const actualTotal = this.goalsStats()
            [key].map((item: IStat) => item.current)
            .reduce((acc, curr) => acc + curr)

         result[key] = {
            expected: expectedTotal,
            actual: actualTotal,
         }
      })

      this.totalProgress.set(result)
      this.updateTotalProgress(result)
      this.updateCurrProgress()
   }

   updateCurrProgress() {
      const expected = this.totalProgress()[this.category()].expected
      const actual = this.totalProgress()[this.category()].actual

      const result = this.getPercentage(actual, expected)

      this.progress.set(result)
   }

   updateTotalProgress(data) {
      let expectedTotal = 0
      let actualTotal = 0

      Object.keys(stats).forEach((key) => {
         expectedTotal += data[key].expected
         actualTotal += data[key].actual
      })

      const result = this.getPercentage(actualTotal, expectedTotal)

      this.totalNum.set(result)
   }

   getPercentage(value, max) {
      if (max === 0) {
         return 0
      }
      return Math.floor((value * 100) / max)
   }
}
