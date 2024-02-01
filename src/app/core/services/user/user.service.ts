import { Injectable, signal } from '@angular/core'
import { IUser } from '../../models/user.model'

@Injectable({
   providedIn: 'root',
})
export class UserService {
   public user = signal<IUser | {}>({})

   constructor() {}

   setUser(userData: IUser) {
      localStorage.setItem('user', JSON.stringify(userData))
   }

   getUser(): IUser | null {
      const user = JSON.parse(localStorage.getItem('user')!)

      if (user) {
         return user
      }

      return null
   }
}
