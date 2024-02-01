export interface IUserLogin {
   login: string
   password: string
   name?: string
}

export interface IUserRegister {
   email: string
   password: string
   name: string
}

export interface IAuthResponse extends IUserRegister {
   'user-token': string
   objectId: string
}

export interface IUser {
   email: string
   token: string
   name: string
   userId: string
}
