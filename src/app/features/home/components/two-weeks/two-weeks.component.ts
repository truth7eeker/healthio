import { Component, inject } from '@angular/core'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {
   faChevronLeft,
   faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import { UserService } from 'src/app/core/services/user/user.service'
import { CalendarService } from '../../../../core/services/calendar/calendar.service'
import { DayCardComponent } from '../../entities/day-card/day-card.component'
import { HealthService } from 'src/app/core/services/health/health.service'

@Component({
   selector: 'app-two-weeks',
   standalone: true,
   imports: [FontAwesomeModule, DayCardComponent],
   templateUrl: './two-weeks.component.html',
})
export class TwoWeeksComponent {
   readonly userService: UserService = inject(UserService)
   readonly calendarService: CalendarService = inject(CalendarService)
   readonly healthService: HealthService = inject(HealthService)
   readonly user = this.userService.getUser()

   faLeft = faChevronLeft
   faRight = faChevronRight

   next() {
      this.calendarService.nextTwoWeeks()
   }

   prev() {
      this.calendarService.prevTwoWeeks()
   }

   getCurrentDayData(day: string) {
      this.healthService.setDay(day)
      this.healthService.getInitialHealth()
   }

}
