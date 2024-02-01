import { Component, inject, Output, EventEmitter, input } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CalendarService } from '../../../../core/services/calendar/calendar.service'
import { HealthService } from 'src/app/core/services/health/health.service'

@Component({
   selector: 'app-day-card',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './day-card.component.html',
})
export class DayCardComponent {
   readonly calendarService: CalendarService = inject(CalendarService)
   healthService: HealthService = inject(HealthService)
   day = input<Date>(new Date())

   @Output() handleClick: EventEmitter<string> = new EventEmitter()

   select(day: any) {
      this.calendarService.selectDay(day)
      this.handleClick.emit(day)
   }
}
