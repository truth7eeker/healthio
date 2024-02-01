import { Router } from '@angular/router'
import { inject } from '@angular/core'

export const authGuard = () => {
   const token = localStorage.getItem('token')
   const router: Router = inject(Router)

   if (token) {
      return true
   } else {
      router.navigate(['login'])
      return false
   }
}
