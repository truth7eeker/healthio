import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
   selector: 'app-main-btn',
   standalone: true,
   imports: [],
   templateUrl: './main-btn.component.html',
})
export class MainBtnComponent {
   @Input() className: string
   @Input() title: string
   @Input() type: string

   @Output() handleClick = new EventEmitter<MouseEvent>()

   click(event) {
      this.handleClick.emit(event)
   }
}
