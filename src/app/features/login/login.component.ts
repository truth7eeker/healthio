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
   selector: 'app-login',
   standalone: true,
   imports: [
      InputComponent,
      MainBtnComponent,
      ReactiveFormsModule,
      RouterModule,
      FormControlPipe,
   ],
   templateUrl: './login.component.html',
   providers: [AuthService],
})
export class LoginComponent implements OnInit, OnDestroy {
   // Название не самое подходящее, обычно дублируют название сервиса, но с маленькой буквы (экземпляр класса)
   readonly http: AuthService = inject(AuthService)
   readonly subs = new SubscriptionHandler()

   // Не забывай типизировать формы
   loginData: FormGroup = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
         Validators.required,
         Validators.minLength(8),
      ]),
   })

   ngOnInit() {
      // Очень правильная идея, круто что ты об этом подумала
      this.subs.add(this.loginData.valueChanges.subscribe())
   }

   ngOnDestroy() {
      this.subs.clear()
   }

   onSubmit() {
      if (this.loginData.valid) {
         this.http.login(this.loginData.value)
      }
   }
}
