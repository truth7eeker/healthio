import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { SidebarComponent } from './components/sidebar/sidebar.component'

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [RouterOutlet, SidebarComponent],
   templateUrl: './home.component.html',
})
export class HomeComponent {}
