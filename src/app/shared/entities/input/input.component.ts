import { Component, OnInit, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
   selector: 'app-input',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
   id = input<string>('')
   control = input<FormControl>()
   label = input<string>()
   type = input<string>()
   className = input<string>()
   labelClassName = input<string>()
   minlength? = input<string>()
   step? = input<string>()
   minValue? = input<string>()
   value = input<string>()

   errorMessages: Record<string, string> = {}

   ngOnInit(): void {
      this.errorMessages = {
         required: `${this.label()} is required`,
         email: `${this.label()} format shoud be correct`,
         minlength: `${this.label()} should be at least ${this.minlength()} characters long`,
      }
   }
}
