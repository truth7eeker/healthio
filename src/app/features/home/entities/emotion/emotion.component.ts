import { Component, input, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HealthService } from 'src/app/core/services/health/health.service'
import { IEmotion } from 'src/app/core/models/health.model'

@Component({
   selector: 'app-emotion',
   standalone: true,
   imports: [CommonModule, FontAwesomeModule],
   templateUrl: './emotion.component.html',
})
export class EmotionComponent {
   healthService: HealthService = inject(HealthService)

   emotion = input<IEmotion>()

   setEmotion(id: string) {
      this.healthService.setEmotion(id)
   }
}
