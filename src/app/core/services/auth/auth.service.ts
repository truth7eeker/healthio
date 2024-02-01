import { inject, Injectable, signal } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http'
import { catchError, map, tap, throwError } from 'rxjs'
import { Router } from '@angular/router'

import { BASE_API } from '../../constants/api'
import { homeRoutes, mainRoutes } from '../../constants/routes'
import { IAuthResponse, IUser, IUserLogin, IUserRegister, } from '../../models/user.model'
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

   // Сигналы потрогала, круто
   public isAuth = signal(false)
   public authErr = signal('')

   constructor() {
      const token = localStorage.getItem('token')
      this.isAuth.set(!!token)
   }

   register(registrationData: IUserRegister) {
      /*
         тут несколько моментов
         1. Можно создать дополнительный сервис RestService, который будет содержать методы для работы с API.
         Например, там будет метод post(endpoint: string, data: T, и тп). У тебя появится новый слой абстракции.
         Вся логика работы с API будет зарыта в нем, ты просто вызываешь метод с нужными параметрами.
         Это упростит твою жизнь, если вдруг API поменяется и тестить будет проще.
         2. Подписываться сразу в сервисах не стоит, это должно делаться в компонентах. Я понимаю почему ты так сделала,
         но это не правильно. В сервисах должна быть только логика которую будут потреблять (providers) другие компоненты, директивы, сервисы и тп, и будут сами решать когда и что делать.
         В данном кейсе, если ты захочешь что-то сделать с результатом запроса в компоненте (LoginComponent), ты не сможешь это сделать, потому что подписка происходит в сервисе.

      */
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
            // Можно попробовать сделать httpInterceptor, который будет обрабатывать ошибки и делать с ними, что захочешь
             // Опять же, вся логика будет в одном месте
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
               // Можно вот так упростить
               return {
                  email: res.email,
                  token: res['user-token'],
                  name: res.name,
                  userId: res.objectId,
               }
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
      console.log('logged out') // Лучше не показывать юзеру внутренности твоего кода. Вряд ли он их поймет и как-то использует, но все же лучше их не оставлять. На худой конец закоментить просто
      console.log(localStorage.getItem('token'))

   }
}
