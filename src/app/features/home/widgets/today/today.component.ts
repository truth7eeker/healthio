import { Component, OnInit, inject } from '@angular/core'

import { TwoWeeksComponent } from '../../components/two-weeks/two-weeks.component'
import { GoalsComponent } from '../../components/goals/goals.component'
import { EmotionsComponent } from '../../components/emotions/emotions.component'
import { MainBtnComponent } from 'src/app/shared/entities/main-btn/main-btn.component'
import { HealthService } from 'src/app/core/services/health/health.service'

@Component({
   selector: 'app-today',
   standalone: true,
   imports: [
      TwoWeeksComponent,
      GoalsComponent,
      EmotionsComponent,
      MainBtnComponent,
   ],
   templateUrl: './today.component.html',
})
export class TodayComponent implements OnInit {
   private healthService: HealthService = inject(HealthService)
  

   handleClick() {
      this.healthService.sendData()
   }

   ngOnInit() {
      this.healthService.getInitialHealth()
   }

  
}
