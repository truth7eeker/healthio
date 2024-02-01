import { Routes } from '@angular/router'

export const HomeRoutes: Routes = [
   {
      // Вот тут хорошо бы зашли enum
      path: 'today',
      loadComponent: () =>
         import('./widgets/today/today.component').then(
            (c) => c.TodayComponent
         ),
   },
   {
      path: 'settings',
      loadComponent: () =>
         import('./widgets/settings/settings.component').then(
            (c) => c.SettingsComponent
         ),
   },
   {
      path: 'stats',
      loadComponent: () =>
         import('./widgets/stats/stats.component').then(
            (c) => c.StatsComponent
         ),
   },
   {
      path: '**',
      redirectTo: 'today',
      pathMatch: 'full',
   },
]
