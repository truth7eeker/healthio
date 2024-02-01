export interface IStat {
   date: number
   current: number
}

export interface IGoalsStats {
   water: IStat[] | []
   sleep: IStat[] | []
   exercise: IStat[] | []
   outdoor: IStat[] | []
}
