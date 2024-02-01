import { Component, inject } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

import { homeRoutes, mainRoutes } from 'src/app/core/constants/routes'
import { AuthService } from 'src/app/core/services/auth/auth.service'

@Component({
   selector: 'app-sidebar',
   standalone: true,
   imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
   templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
   authService: AuthService = inject(AuthService)

   mainRoutes = mainRoutes
   routes = homeRoutes
   routeNames: string[] = Object.keys(homeRoutes)
   logoutIcon = faRightToBracket

   logout() {
      this.authService.logout()
   }
}
