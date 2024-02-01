import { Component, OnInit, inject } from '@angular/core'

import { StatsService } from 'src/app/core/services/stats/stats.service'
import { ColumnChartComponent } from '../../entities/column-chart/column-chart.component'
import { StatsCategoriesComponent } from '../../components/stats-categories/stats-categories.component'
import { GoalsTotalComponent } from '../../components/goals-total/goals-total.component'

@Component({
   selector: 'app-stats',
   standalone: true,
   imports: [
      ColumnChartComponent,
      StatsCategoriesComponent,
      GoalsTotalComponent,
   ],
   templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
   statsService: StatsService = inject(StatsService)

   ngOnInit() {
      this.statsService.getData()
   }
}
