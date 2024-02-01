import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { HealthService } from 'src/app/core/services/health/health.service';
import { SubscriptionHandler } from 'src/app/shared/utils/subscription.utils';
import { InputComponent } from 'src/app/shared/entities/input/input.component';
import { MainBtnComponent } from 'src/app/shared/entities/main-btn/main-btn.component';
import { getLocalStorage } from 'src/app/shared/utils/local-storage.utils';
import { goalDescription } from 'src/app/core/data/default-data';
import { FormControlPipe } from 'src/app/shared/pipes/form-control/form-control.pipe';

@Component({
  selector: 'app-settings-form',
  standalone: true,
  imports: [InputComponent, MainBtnComponent, ReactiveFormsModule, FormControlPipe],
  templateUrl: './settings-form.component.html',
 
})
export class SettingsFormComponent {
  private healthService: HealthService = inject(HealthService)
  private subs = new SubscriptionHandler()

  goals = goalDescription
  default = getLocalStorage(['water', 'sleep', 'outdoor', 'exercise'])

  desiredGoalsForm: FormGroup = new FormGroup({
     water: new FormControl(this.default['water'] || 0, Validators.required),
     sleep: new FormControl(this.default['sleep'] || 0, Validators.required),
     exercise: new FormControl(
        this.default['exercise'] || 0,
        Validators.required
     ),
     outdoor: new FormControl(
        this.default['outdoor'] || 0,
        Validators.required
     ),
  })

  onSubmit() {
     if (this.desiredGoalsForm.valid) {
        this.healthService.sendDediredGoals(this.desiredGoalsForm.value)
     }
  }

  setDefault() {
     this.healthService.health().goals.map((g) => {
        const key = this.desiredGoalsForm.get([g.name])
        key && key.setValue(g.desired)
     })
  }

  ngOnInit() {
     this.subs.add(this.desiredGoalsForm.valueChanges.subscribe())
     this.setDefault()
  }

  ngOnDestroy() {
     this.subs.clear()
  }
}
