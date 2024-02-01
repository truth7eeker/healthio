import {
   HttpClient,
   HttpErrorResponse,
   HttpHeaders,
   HttpParams,
} from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { map, catchError, throwError } from 'rxjs'

import { BASE_API } from '../../../constants/api'
import {
   IDailyLog,
   IDesiredGoal,
   IGoal,
   IGoalsForm,
   IHealth,
} from '../../../models/health.model'
import { healthData } from 'src/app/core/data/default-data'
import {
   modifyGetDesiredResponseData,
   modifyGetResponseData,
   modifyPostDesiredResponse,
   modifyPostResponseData,
} from '../utils/response-transform'
import { getLocalStorage } from 'src/app/shared/utils/local-storage.utils'

@Injectable({
   providedIn: 'root',
})
export class HealthRestService {
   private http: HttpClient = inject(HttpClient)
   private headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'user-token': localStorage.getItem('token') || '',
   })

   constructor() {}

   getDesiredGoals(goals: IGoal[], desiredGoalsId?) {
      const { userId } = getLocalStorage(['userId'])
      const where = `userId='${userId}'`
      const params = new HttpParams().set('where', where)

      const endpoint = `${BASE_API}/data/DesiredGoal`
      const opts = { headers: this.headers, params }

      return this.http.get<IDesiredGoal>(endpoint, opts).pipe(
         map((res) => {
            if (res[0]) {
               const desiredGoals = JSON.parse(res[0].value)
               desiredGoalsId.set(res[0].objectId)
               const modified = modifyGetDesiredResponseData({
                  desiredGoals,
                  goals,
               })
               return modified
            }
            desiredGoalsId.set('')
            goals.forEach((g) => localStorage.removeItem(g.name))
            return null
         }),
         catchError((err: HttpErrorResponse) => {
            return throwError(() => new Error(err.message))
         })
      )
   }

   getTodaysData(withDesiredGoals: IGoal[], date, dailyLogId) {
      const timestamp = new Date(date).getTime()
      const { userId } = getLocalStorage(['userId'])
      const where = `userId='${userId}'AND day='${timestamp}'`
      const params = new HttpParams().set('where', where)

      const endpoint = `${BASE_API}/data/DailyLog`
      const opts = { headers: this.headers, params }

      return this.http.get<IDailyLog[]>(endpoint, opts).pipe(
         map((res: any) => {
            if (res[0]) {
               const { day, emotions, goals } = res[0]
               const parsedEmotions = emotions && JSON.parse(emotions)
               const parsedGoals = goals && JSON.parse(goals)

               dailyLogId.set(res[0].objectId)

               const data = {
                  day,
                  parsedEmotions,
                  parsedGoals,
                  withDesiredGoals,
               }

               const modified = modifyGetResponseData(data)
               return modified
            }

            const defaultGoals = withDesiredGoals.map((g) => ({
               ...g,
               current: 0,
            }))

            dailyLogId.set('')

            return {
               date,
               goals: defaultGoals,
               emotions: healthData.emotions,
            }
         }),
         catchError((err: HttpErrorResponse) => {
            return throwError(() => new Error(err.message))
         })
      )
   }

   saveTodaysData(healthData: IHealth) {
      const dailyLog = modifyPostResponseData(healthData)

      const endpoint = `${BASE_API}/data/DailyLog`
      const payload = JSON.stringify(dailyLog)
      const opts = { headers: this.headers }

      return this.http.post<IDailyLog>(endpoint, payload, opts)
   }

   updateTodaysData(healthData: IHealth, objectId: string) {
      const dailyLog = modifyPostResponseData(healthData)

      const endpoint = `${BASE_API}/data/DailyLog/${objectId}`
      const payload = JSON.stringify(dailyLog)
      const opts = { headers: this.headers }

      return this.http.put<IDailyLog>(endpoint, payload, opts)
   }

   saveDesiredGoals(desiredGoals: IGoalsForm) {
      const desired = modifyPostDesiredResponse(desiredGoals)

      const endpoint = `${BASE_API}/data/DesiredGoal`
      const payload = JSON.stringify(desired)
      const opts = { headers: this.headers }

      return this.http.post<IDesiredGoal>(endpoint, payload, opts)
   }

   updateDesiredGoals(desiredGoals: IGoalsForm, objectId: string) {
      const desired = modifyPostDesiredResponse(desiredGoals)

      const endpoint = `${BASE_API}/data/DesiredGoal/${objectId}`
      const payload = JSON.stringify(desired)
      const opts = { headers: this.headers }

      return this.http.put<number>(endpoint, payload, opts)
   }

   setUserRelation(objectId: string, table: string) {
      const { userId } = getLocalStorage(['userId'])

      const endpoint = `${BASE_API}/data/${table}/${objectId}/userId`
      const payload = JSON.stringify({ userId })
      const opts = { headers: this.headers }

      return this.http.post<number>(endpoint, payload, opts)
   }
}
