import { Component, OnInit, OnDestroy, inject } from '@angular/core'

import {
   FormGroup,
   FormControl,
   ReactiveFormsModule,
   Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'

import { InputComponent } from 'src/app/shared/entities/input/input.component'
import { MainBtnComponent } from 'src/app/shared/entities/main-btn/main-btn.component'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { FormControlPipe } from 'src/app/shared/pipes/form-control/form-control.pipe'
import { SubscriptionHandler } from 'src/app/shared/utils/subscription.utils'

@Component({
   selector: 'app-register',
   standalone: true,
   imports: [
      InputComponent,
      MainBtnComponent,
      ReactiveFormsModule,
      RouterModule,
      FormControlPipe,
   ],
   templateUrl: './register.component.html',
   providers: [AuthService],
})
export class RegisterComponent implements OnInit, OnDestroy {
   readonly http: AuthService = inject(AuthService)
   readonly subs = new  SubscriptionHandler()

   registrationData: FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
         Validators.required,
         Validators.minLength(8),
      ]),
   })

   ngOnInit() {
      this.subs.add(this.registrationData.valueChanges.subscribe())
   }

   ngOnDestroy() {
      this.subs.clear()
   }

   onSubmit() {
      if (this.registrationData.valid) {
         this.http.register(this.registrationData.value)
      }
   }
}
