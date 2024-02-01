import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { goalDescription } from 'src/app/core/data/default-data';

@Component({
  selector: 'app-settings-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-info.component.html',
})
export class SettingsInfoComponent {
  goals = goalDescription
}
