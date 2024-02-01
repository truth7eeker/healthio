import { Component, inject } from '@angular/core'

import { faBullseye } from '@fortawesome/free-solid-svg-icons'

import { StatsService } from 'src/app/core/services/stats/stats.service'
import { GoalTotalComponent } from '../../entities/goal-total/goal-total.component'
import { emotionIcons, goalDescription } from 'src/app/core/data/default-data'

@Component({
   selector: 'app-goals-total',
   standalone: true,
   imports: [GoalTotalComponent],
   templateUrl: './goals-total.component.html',
})
export class GoalsTotalComponent {
   statsService: StatsService = inject(StatsService)
   happy = emotionIcons.happy
   target = faBullseye
   goalDesc = goalDescription
}
