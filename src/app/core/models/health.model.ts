import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface IHealth {
   date: number | Date | string
   goals: IGoal[]
   emotions: IEmotion[]
}

export interface IGoal {
   id: string
   name: string
   metrics: string
   current: any
   desired: number
   icon?: IconProp | any
   color?: string
   iconColor?: string
}

export interface IEmotion {
   id: string
   name: string
   active: boolean
   icon?: IconProp | any
}

export interface IDailyLog {
   objectId: string
   day: Date
   emotions: string
   goals: string
}

export interface IDesiredGoals {
   value: string
}

export interface IDesiredGoal {
   objectId: string
   value: number
}

export interface IGoalsForm {
   water: string
   sleep: string
   exericse: string
   outdoor: string
}
