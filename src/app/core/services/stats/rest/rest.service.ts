import {
   HttpClient,
   HttpErrorResponse,
   HttpHeaders,
   HttpParams,
} from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { catchError, throwError, map } from 'rxjs'

import { BASE_API } from 'src/app/core/constants/api'
import { IDailyLog } from 'src/app/core/models/health.model'
import { getLocalStorage } from 'src/app/shared/utils/local-storage.utils'
import { modifyData } from '../utils/response-transform.utils'

@Injectable({
   providedIn: 'root',
})
export class RestService {
   private http: HttpClient = inject(HttpClient)
   private headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'user-token': localStorage.getItem('token') || '',
   })

   constructor() {}

   getPeriodData({ startTimestamp, endTimestamp }) {
      const { userId } = getLocalStorage(['userId'])
      const where = `userId='${userId}' AND day <= ${startTimestamp} AND day >= ${endTimestamp}`
      const sortBy = `day desc`
      const params = new HttpParams().set('where', where).set('sortBy', sortBy)

      const endpoint = `${BASE_API}/data/DailyLog`
      const opts = { params, headers: this.headers }

      return this.http.get<IDailyLog[]>(endpoint, opts).pipe(
         map((res) => {
            if (res) {
               const parsed = res.map((dailyLog: IDailyLog) => ({
                  date: dailyLog.day,
                  goals: JSON.parse(dailyLog.goals),
                  emotions: JSON.parse(dailyLog.emotions),
               }))
               return modifyData(parsed)
            }
            return modifyData([])
         }),
         catchError((err: HttpErrorResponse) => {
            return throwError(() => new Error(err.message))
         })
      )
   }
}
