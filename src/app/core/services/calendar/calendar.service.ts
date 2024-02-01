import { Injectable, signal } from '@angular/core'

import * as moment from 'moment'

@Injectable({
   providedIn: 'root',
})
export class CalendarService {
   today: moment.Moment = moment().startOf('day')
   twoWeeks = signal<Date[]>([])
   selectedDay = signal<Date | null>(null)

   constructor() {
      this.selectedDay.set(this.today.toDate())
      this.generateTwoWeeks()
   }

   // handle data for two weeks
   generateTwoWeeks() {
      this.twoWeeks.set([])
      let newTwoWeeks = []
      for (let i = 0; i < 14; i++) {
         const day = this.today.clone().add(i, 'days')
         newTwoWeeks.push(day.toDate())
      }
      this.twoWeeks.set(newTwoWeeks)
   }

   nextTwoWeeks() {
      this.today.add(14, 'days')
      this.generateTwoWeeks()
   }

   prevTwoWeeks() {
      this.today.subtract(14, 'days')
      this.generateTwoWeeks()
   }

   selectDay(day: Date) {
      this.selectedDay.set(day)
   }
}
