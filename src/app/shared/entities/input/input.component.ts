import { Component, OnInit, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

// Вот гайд как создавать кастомные контролы в ангуляре https://blog.angular-university.io/angular-custom-form-controls/
// Если следовать ему, то ты сможешь работать в <app-input> как с обычным <input> (передавать в него formControlName, value, disabled, required и тд)
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
