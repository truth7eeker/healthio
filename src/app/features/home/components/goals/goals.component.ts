import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { GoalComponent } from '../../entities/goal/goal.component'
import { HealthService } from '../../../../core/services/health/health.service'

@Component({
   selector: 'app-goals',
   standalone: true,
   imports: [CommonModule, GoalComponent, FontAwesomeModule],
   templateUrl: './goals.component.html',
})
export class GoalsComponent {
   healthService: HealthService = inject(HealthService)
}
