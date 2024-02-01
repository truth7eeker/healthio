import { Injectable, inject, signal } from '@angular/core'
import { switchMap, tap } from 'rxjs'

import { SpinnerVisibilityService } from 'ng-http-loader';

import {
   IEmotion,
   IGoal,
   IGoalsForm,
   IHealth,
} from 'src/app/core/models/health.model'
import { HealthRestService } from './rest/rest.service'
import { AlertService } from '../alert/alert.service'
import { CalendarService } from '../calendar/calendar.service'
import {
   healthData,
   emotionIcons,
   goalDescription,
} from '../../data/default-data'
import { isInteger } from 'src/app/shared/utils/math.utils'

@Injectable({
   providedIn: 'root',
})
export class HealthService {
   private calendarService: CalendarService = inject(CalendarService)
   private restService: HealthRestService = inject(HealthRestService)
   private alert: AlertService = inject(AlertService)
   private spinner: SpinnerVisibilityService = inject(SpinnerVisibilityService)

   health = signal<IHealth>(healthData)
   desiredGoalsId = signal<string>('')
   dailyLogId = signal<string>('')

   goalDesc = goalDescription
   emoIcons = emotionIcons

   constructor() {
      this.initData()
   }

   initData() {
      const updatedGoals = this.health().goals.map((goal: IGoal) => {
         const { color, icon, iconColor } = this.goalDesc[goal.name]
         return {
            ...goal,
            icon,
            color,
            iconColor,
         }
      })

      const updatedEmotions = this.health().emotions.map(
         (emotion: IEmotion) => {
            const icon = this.emoIcons[emotion.name]
            return {
               ...emotion,
               icon,
            }
         }
      )

      this.health.update(() => ({
         date: this.calendarService.selectedDay(),
         goals: updatedGoals,
         emotions: updatedEmotions,
      }))
   }

   increment(id: string) {
      const updatedGoals = [...this.health().goals]
      const target = updatedGoals.find((goal: IGoal) => goal.id === id)

      if (!target.desired) {
         this.alert.showWarningToastr(
            'This goal is currently 0, set it on Settings page'
         )
         return
      }

      const isInt = isInteger(target.desired)

      target.current = isInt
         ? target.current + 1
         : (target.current * 1000 + 0.1 * 1000) / 1000

      this.health.update((prev) => ({ ...prev, goals: updatedGoals }))
   }

   decrement(id: string) {
      const updatedGoals = [...this.health().goals]
      const target = updatedGoals.find((goal: IGoal) => goal.id === id)

      if (!target.desired) {
         this.alert.showWarningToastr(
            'This goal is currently 0, set it on Settings page'
         )
         return
      }

      if (target.current === 0) {
         return
      }

      const isInt = isInteger(target.desired)

      target.current = isInt
         ? target.current - 1
         : (target.current * 1000 - 0.1 * 1000) / 1000

      this.health.update((prev) => ({ ...prev, goals: updatedGoals }))
   }

   setEmotion(id: string) {
      const updatedEmotions = this.health().emotions.map((e: IEmotion) => {
         if (e.id === id) {
            e.active = !e.active
         } else {
            e.active = false
         }
         return e
      })

      this.health.update((prev) => ({ ...prev, emotions: updatedEmotions }))
   }

   setDay(day: string) {
      this.health.update((prev) => ({ ...prev, date: day }))
   }

   getInitialHealth() {
      this.spinner.show()
      this.restService
         .getDesiredGoals(this.health().goals, this.desiredGoalsId)
         .pipe(
            switchMap((goals: IGoal[]) => {
               const g = goals ? goals : this.health().goals
               return this.restService.getTodaysData(
                  g,
                  this.health().date,
                  this.dailyLogId
               )
            })
         )
         .subscribe((healthData: IHealth) => {
            if (!healthData) {
               return
            }
            this.health.set(healthData)
            this.initData()
            this.spinner.hide()
         })
   }

   sendData() {
      const desiredNotSet = this.health().goals.every(
         (goal: IGoal) => goal.desired === 0
      )
      const goalsNotModidied = this.health().goals.every(
         (goal: IGoal) => goal.current === 0
      )
      const emotionNotSet = this.health().emotions.every(
         (emotion: IEmotion) => !emotion.active
      )
      const empty = goalsNotModidied && emotionNotSet

      if ((desiredNotSet && emotionNotSet) || empty) {
         this.alert.showWarningToastr('Nothing to save')
         return
      }

      if (this.dailyLogId()) {
         this.restService
            .updateTodaysData(this.health(), this.dailyLogId())
            .subscribe(() => this.alert.showSuccessToastr('Updated!'))
      } else {
         this.restService
            .saveTodaysData(this.health())
            .pipe(
               switchMap(({ objectId }) => {
                  return this.restService.setUserRelation(objectId, 'DailyLog')
               })
            )
            .subscribe(() => {
               this.alert.showSuccessToastr('Saved!')
            })
      }
   }

   sendDediredGoals(desiredGoals: IGoalsForm) {
      return this.restService
         .getDesiredGoals(this.health().goals, this.desiredGoalsId)
         .pipe(
            switchMap((goals: IGoal[]) => {
               if (goals) {
                  return this.restService
                     .updateDesiredGoals(desiredGoals, this.desiredGoalsId())
                     .pipe(tap(() => this.alert.showSuccessToastr('Updated!')))
               } else {
                  return this.restService.saveDesiredGoals(desiredGoals).pipe(
                     switchMap(({ objectId }) => {
                        return this.restService
                           .setUserRelation(objectId, 'DesiredGoal')
                           .pipe(
                              tap(() => this.alert.showSuccessToastr('Saved!'))
                           )
                     })
                  )
               }
            })
         )
         .subscribe()
   }

}
