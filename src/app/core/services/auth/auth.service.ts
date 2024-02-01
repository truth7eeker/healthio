import { Injectable, inject, signal } from '@angular/core'
import {
   HttpClient,
   HttpErrorResponse,
   HttpHeaders,
} from '@angular/common/http'
import { tap, catchError, throwError, map } from 'rxjs'
import { Router } from '@angular/router'

import { BASE_API } from '../../constants/api'
import { mainRoutes, homeRoutes } from '../../constants/routes'
import {
   IAuthResponse,
   IUserRegister,
   IUser,
   IUserLogin,
} from '../../models/user.model'
import { UserService } from '../user/user.service'

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   private http: HttpClient = inject(HttpClient)
   private headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
   })
   private router: Router = inject(Router)
   private useService: UserService = inject(UserService)

   public isAuth = signal(false)
   public authErr = signal('')

   constructor() {
      const token = localStorage.getItem('token')
      this.isAuth.set(!!token)
   }

   register(registrationData: IUserRegister) {
      return this.http
         .post<IAuthResponse>(`${BASE_API}/users/register`, registrationData, {
            headers: this.headers,
         })
         .pipe(
            tap(() => {
               this.login({
                  login: registrationData.email,
                  password: registrationData.password,
                  name: registrationData.name,
               })
            }),
            catchError((err: HttpErrorResponse) => {
               this.authErr.set(err.error.message)
               return throwError(() => new Error(err.error))
            })
         )
         .subscribe()
   }

   login(loginData: IUserLogin) {
      return this.http
         .post<IAuthResponse>(`${BASE_API}/users/login`, loginData, {
            headers: this.headers,
         })
         .pipe(
            map((res: IAuthResponse) => {
               const modifiedRes = {
                  email: res.email,
                  token: res['user-token'],
                  name: res.name,
                  userId: res.objectId,
               }
               return modifiedRes
            }),
            tap((data: IUser) => {
               localStorage.setItem('token', data.token)
               localStorage.setItem('userId', data.userId)
               this.isAuth.set(true)
            }),
            catchError((err: HttpErrorResponse) => {
               this.authErr.set(err.error.message)
               return throwError(() => new Error(err.error))
            })
         )
         .subscribe((data) => {
            this.router.navigate([homeRoutes.today.route])
            this.authErr.set('')
            this.useService.setUser(data)
            console.log(this.isAuth())
         })
   }

   logout() {
      localStorage.removeItem('token')
      this.isAuth.set(false)
      this.router.navigate([mainRoutes.login])
      console.log('logged out')
      console.log(localStorage.getItem('token'))

   }
}
