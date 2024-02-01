import { Routes } from '@angular/router'
import { authGuard } from './core/guards/auth/auth.guard'

import { mainRoutes } from './core/constants/routes'

export const routes: Routes = [
   {
      // Для логина и регистрации тоже нужен guard, чтобы не пускать залогиненного пользователя
      path: mainRoutes.login,
      loadComponent: () =>
         import('./features/login/login.component').then(
            (c) => c.LoginComponent
         ),
   },
   {
      path: mainRoutes.register,
      loadComponent: () =>
         import('./features/register/register.component').then(
            (c) => c.RegisterComponent
         ),
   },
   {
      path: mainRoutes.home,
      loadComponent: () =>
         import('./features/home/home.component').then((c) => c.HomeComponent),
      loadChildren: () =>
         import('./features/home/home.routes').then((r) => r.HomeRoutes),
      canActivate: [authGuard],
   },
   {
      path: '**',
      redirectTo: mainRoutes.home,
   },
]
