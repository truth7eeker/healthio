import { CommonModule } from '@angular/common'
import { Component, input, EventEmitter, Output } from '@angular/core'

@Component({
   selector: 'app-stats-category',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './stats-category.component.html',
})
export class StatsCategoryComponent {
   name = input<string>('water')
   category = input<string>('water')
   metrics = input<string>('glass')

   @Output() handleClick: EventEmitter<{ name: string; metrics: string }> =
      new EventEmitter()

   click(name, metrics) {
      this.handleClick.emit({ name, metrics })
   }
}
