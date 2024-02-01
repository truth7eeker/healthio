import { Component } from '@angular/core'

import { SettingsFormComponent } from '../../components/settings-form/settings-form.component'
import { SettingsInfoComponent } from '../../components/settings-info/settings-info.component'

@Component({
   selector: 'app-settings',
   standalone: true,
   imports: [SettingsFormComponent, SettingsInfoComponent],
   templateUrl: './settings.component.html',
})
export class SettingsComponent  {
 
}
