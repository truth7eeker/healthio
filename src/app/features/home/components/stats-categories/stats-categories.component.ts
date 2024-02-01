import { Component, inject } from '@angular/core'

import { StatsCategoryComponent } from '../../entities/stats-category/stats-category.component'
import { healthData } from 'src/app/core/data/default-data'
import { StatsService } from 'src/app/core/services/stats/stats.service'

@Component({
   selector: 'app-stats-categories',
   standalone: true,
   imports: [StatsCategoryComponent],
   templateUrl: './stats-categories.component.html',
})
export class StatsCategoriesComponent {
   statsService: StatsService = inject(StatsService)
   goals = healthData.goals

   handleClick(event: { name: string; metrics: string }) {
      this.statsService.setCategory(event.name, event.metrics)
   }
}
