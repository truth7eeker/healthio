import { CommonModule } from '@angular/common'
import { Component, input, Input } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

@Component({
   selector: 'app-goal-total',
   standalone: true,
   imports: [CommonModule, FontAwesomeModule],
   templateUrl: './goal-total.component.html',
})
export class GoalTotalComponent {
   @Input() icon: IconProp
   num = input()
   text = input()
   color = input('#FBEF5C')
}
