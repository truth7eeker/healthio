import { Component, input, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RadialChartComponent } from '../radial-chart/radial-chart.component'
import { IGoal } from 'src/app/core/models/health.model'
import { HealthService } from '../../../../core/services/health/health.service'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@Component({
   selector: 'app-goal',
   standalone: true,
   imports: [CommonModule, RadialChartComponent, FontAwesomeModule],
   templateUrl: './goal.component.html',
})
export class GoalComponent {
   healthService: HealthService = inject(HealthService)

   goal = input<IGoal>()

   increment(id: string) {
      this.healthService.increment(id)
   }

   decrement(id: string) {
      this.healthService.decrement(id)
   }
}
