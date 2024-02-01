import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { EmotionComponent } from '../../entities/emotion/emotion.component'
import { HealthService } from 'src/app/core/services/health/health.service'

@Component({
   selector: 'app-emotions',
   standalone: true,
   imports: [CommonModule, FontAwesomeModule, EmotionComponent],
   templateUrl: './emotions.component.html',
})
export class EmotionsComponent {
   healthService: HealthService = inject(HealthService)
}
